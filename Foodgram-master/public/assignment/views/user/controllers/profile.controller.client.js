(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", profileController);

    function profileController(UserService, $routeParams, $location) {
        var vm = this;
        var userID = $routeParams['uid'];

        //event handlers
        vm.update = update;
        vm.unRegisterUser = unRegisterUser;

        function init() {
            var promise = UserService.findUserById(userID);
            promise.success(function (user) {
               vm.user = user;
            });
        }
        init();

        function update(newUser) {
            UserService
                .updateUser(userID, newUser)
                .success(function (updatedUser) {
                    if(updatedUser == null){
                        vm.error = "Unable to Update User";
                    }else{
                        vm.message = "User Successfully Updated";
                    }
                });
        }

        function unRegisterUser(user) {
            var ans = confirm("Are you sure that you want to Delete user?");
            if(ans){
                UserService
                    .deleteUser(user._id)
                    .success(function () {
                        $location.url("/login");
                    })
                    .error(function () {
                        vm.error = "Unable to delete User";
                    })
            }

        }
    }
    
})();
