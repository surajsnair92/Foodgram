
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userID = $routeParams['uid'];


        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userID)
                .success(function (websites) {
                    vm.websites = websites;
                })
        }
        init();

    }
})();