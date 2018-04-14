(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, WebsiteService, $location, UserService) {
        var vm = this;
        vm.userID = $routeParams['uid'];
        
        //event handler
        vm.createWebsite = createWebsite;


        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userID)
                .success(function (websites) {
                    vm.websites = websites;
                })
        }
        init();
        
        function createWebsite(website) {
            WebsiteService
                .createWebsite(vm.userID, website)
                .success(function (newWebsite) {
                    UserService.addWebsite(vm.userID, newWebsite._id)
                        .success(function () {
                            $location.url("/user/" + vm.userID + "/website");
                        });
                });
        }

    }
})();
