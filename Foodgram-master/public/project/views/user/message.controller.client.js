(function () {
    angular
        .module("Project")
        .controller("MessageController", MessageController);

    function MessageController(UserService, MessageService, $routeParams, $location, $rootScope){
        var vm = this;
        vm.admin = "admin";
        vm.userID = $routeParams['uid'];
        var uid = $routeParams['uid'];


        vm.deleteMessage = deleteMessage;
        vm.reply = reply;
        vm.sendinfo = sendinfo;
        vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(function(response) {
                    $rootScope.currentUser = null;
                    $location.url("/home");
                });
        }


        function sendinfo(id, from) {
            vm.to_id = id;
            vm.replyto = from;
        }

        function reply(message) {
            UserService
                .findUserById(vm.userID)
                .success(function (user) {
                    vm.user = user;
                    vm.sender = vm.user.username;
                    vm.sendid = vm.user._id;
                    UserService
                        .findUserById(vm.to_id)
                        .success(function (data) {
                            vm.thisuser = data;
                            vm.uname = vm.thisuser.username;
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
                                })
                        });
                })

        }

        function init() {
            UserService
                .findUserById(uid)
                .success(function (user) {
                    vm.user = user;
                    vm.lname = user.lastname;
                    vm.fname = user.username;
                });
            UserService
                .findUserById(vm.userID)
                .success(function (data) {
                    vm.user = data;
                    vm.name = vm.user.username;
                    MessageService
                        .findAllmessagesforId(vm.userID)
                        .success(function (messages) {
                            vm.messages = messages;
                        });
                })

        }
        init();


        function deleteMessage(mid) {
            MessageService
                .deleteMessage(mid)
                .success(function () {
                    init();
                })
        }
    }
})();