(function () {
    angular
        .module("Project")
        .controller("AdminController", AdminController);


    function AdminController(UserService, ReviewService, $routeParams, $location, MessageService, $rootScope){
        var vm = this;
        vm.type = "user";
        vm.admin = "admin";
        vm.userID = $routeParams['uid'];
        var uid = $routeParams['uid'];

        vm.view = view;
        vm.deleteUser = deleteUser;
        vm.createUser = createUser;
        vm.details = details;
        vm.postmessage = postmessage;
        vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(function(response) {
                    $rootScope.currentUser = null;
                    $location.url("/home");
                });
        }


        function details(ID, name) {
            vm.to_id = ID;
            vm.to = name;
        }

        function postmessage(message) {
            UserService
                .findUserById(vm.userID)
                .success(function (user) {
                    vm.user = user;
                    vm.sender = vm.user.username;
                    vm.sendid = vm.user._id;
                    var newmessage = {
                        from: vm.sender,
                        from_id: vm.sendid,
                        to: vm.to,
                        to_id: vm.to_id,
                        message: message.data
                    };
                            MessageService
                                .createMessage(vm.userID, newmessage)
                                .success(function (message) {
                                    vm.message = ""
                                })
                        });
        }


        function createUser(newuser)
        {if (newuser && newuser.username && newuser.password && newuser.cpassword) {
            if (newuser.password === newuser.cpassword) {
                UserService
                    .findUserByUsername(newuser.username)
                    .success(function (user) {
                        vm.uerror = "Username already taken";
                    })
                    .error(function () {
                        newuser.type = "user";
                        UserService
                            .register(newuser)
                            .success(function (newUser) {
                                var user = newUser;
                                vm.newuser = "";
                                vm.newuser.email = ""
                                init();
                            })
                            .error(function () {
                                vm.uerror = "User Registration Failed";
                            })
                    });
            }
            else {
                vm.uerror = "Passowrds do not match";
            }
        }else {
            vm.uerror = "Enter Username";
        }
        }

        function deleteUser(ID) {
            var ans = confirm("Delete user?");
            if (ans) {
                UserService
                    .deleteUser(ID)
                    .success(function () {
                        ReviewService
                            .deleteReviewsforUser(ID)
                            .success(function (status) {
                                MessageService
                                    .deleteMessagesforUser(ID)
                                    .success(function (status) {
                                        init();
                                    });

                            });
                    })
            }
        }

        function view(ID, name) {
            vm.by = name;

            ReviewService
                .findAllReviews(ID)
                .success(function (reviews) {
                    vm.reviews = reviews;
                });
        }
        function init() {
            UserService
                .findUserById(uid)
                .success(function (user) {
                    vm.user = user;
                    vm.lname = user.lastname;
                    vm.fname = user.username;
                    vm.user.type = user.type;
                });
            UserService
                .findUserbytype(vm.type)
                .success(function (users) {
                    vm.users = users;
                });
        }
        init();

        function deleteReview(rid) {
            ReviewService
                .deleteReview(rid)
                .success(function () {
                    $location.url("/user/" + vm.userID + "/reviews/");
                })
        }
    }
})();