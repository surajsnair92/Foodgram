(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;

        //event handlers
        vm.login = login;

        function init() {
        }
        init();

        function login(user) {
           var promise = UserService.login(user);

            promise.success(function (user) {
                if(user[0] != null){
                    $location.url("/user/" + user[0]._id);
                }
                else {
                    vm.error = "User not found";
                }
           });

        }
    }

})();
