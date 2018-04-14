
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;

        //Event Handlers
        vm.register = register;

        function init() {
        }
        init();

        function register(user) {
            UserService
                .findUserByUsername(user.username)
                .success(function (user) {
                        vm.error = "Username already taken";
                })
                .error(function () {
                    UserService
                        .createUser(user)
                        .success(function (newUser) {
                            $location.url("/user/" + newUser._id);
                        })
                        .error(function () {
                            vm.error = "User Registration Failed";
                        })
                })
        }


    }
})();
