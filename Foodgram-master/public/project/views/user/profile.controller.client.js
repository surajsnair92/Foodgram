(function () {
    angular
        .module("Project")
        .controller("ProfileController", ProfileController)
        .controller("ProfileProfileController", ProfileProfileController);

    function ProfileController(UserService, $routeParams, $location,ReviewService, MessageService, $rootScope){
        var vm = this;
        vm.admin = "admin";
        vm.userID = $routeParams['uid'];
        var uid = $routeParams['uid'];

        vm.deleteUser = deleteUser;
        vm.update = update;
        vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(function(response) {
                    $rootScope.currentUser = null;
                    $location.url("/home");
                });
        }

        function update(newUser) {
            newUser.id = vm.userID;
            UserService
                .updateUser(vm.userID, newUser)
                .success(function (updatedUser) {
                    if(updatedUser == null){
                        vm.error = "Unable to Update User";
                    }else{
                        vm.message = "User Successfully Updated";
                    }
                });
        }

        function deleteUser() {
                UserService
                    .deleteUser(vm.userID)
                    .success(function () {
                        ReviewService
                            .deleteReviewsforUser(vm.userID)
                            .success(function (status) {
                                MessageService
                                    .deleteMessagesforUser(vm.userID)
                                    .success(function (status) {
                                        $location.url("/home");
                                    });

                            });

                    });

        }

        function init() {
            UserService
                .findUserById(uid)
                .success(function (user) {
                vm.user = user;
                vm.lname = user.lastname;
                vm.fname = user.username;
            });
        }
        init();
    }

    function ProfileProfileController(UserService, $routeParams, ReviewService, MessageService, $rootScope, $location){
        var vm = this;
        vm.pID = $routeParams['pid'];
        vm.userID = $routeParams['uid'];
        vm.btntext = "Follow";
        vm.toggle = true;
        vm.follow = follow;

        vm.postmessage = postmessage;
        vm.getDateFormat = getDateFormat;
        vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(function(response) {
                    $rootScope.currentUser = null;
                    $location.url("/home");
                });
        }



        function getDateFormat(timestamp) {
            return new Date(timestamp);
        }


        function postmessage(message) {
            UserService
                .findUserById(vm.userID)
                .success(function (user) {
                    vm.user = user;
                    vm.sender = vm.user.username;
                    vm.sendid = vm.user._id;
                    UserService
                        .findUserById(vm.pID)
                        .success(function (data) {
                            vm.thisuser = data;
                            var newmessage = {
                                from: vm.sender,
                                from_id: vm.sendid,
                                to: vm.thisuser.username,
                                to_id: vm.thisuser._id,
                                message: message.data
                            };
                            MessageService
                                .createMessage(vm.userID, newmessage)
                                .success(function (message) {
                                    vm.message = "";
                                })
                        });
                })

        }
        
        function follow() {
            UserService
                .addFollowing(vm.userID, vm.pID)
                .success(function (user) {
                    UserService
                        .addFollower(vm.pID, vm.userID)
                        .success(function (user) {
                            //console.log("Followers");
                            //console.log(user)
                        })
                });
        }
        function init() {
            ReviewService
                .findAllReviews(vm.pID)
                .success(function (reviews) {
                    vm.reviews = reviews;
                });
            UserService
                .findUserById(vm.pID)
                .success(function (user) {
                vm.curuser = user;
                vm.lastname = user.lastname;
                vm.firstname = user.firstname;
                vm.username = user.username;
            });
        }
        init();
    }
})();