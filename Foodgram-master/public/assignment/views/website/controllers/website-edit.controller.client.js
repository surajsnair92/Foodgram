(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService,$location) {
        var vm = this;
        vm.userID = $routeParams['uid'];
        vm.websiteID = $routeParams['wid'];

        //Event Handler
        vm.editWebsite = editWebsite;
        vm.deleteSite = deleteSite;

        function init() {
            WebsiteService
                .findWebsiteById(vm.websiteID)
                .success(function (website) {
                    vm.website = website;
                });
            WebsiteService
                .findWebsitesByUser(vm.userID)
                .success(function (websites) {
                    vm.websites = angular.copy(websites);
                })
        }
        init();

        function editWebsite(newWebsite) {
            WebsiteService
                .updateWebsite(vm.websiteID, newWebsite)
                .success(function () {
                    $location.url("/user/" + vm.userID + "/website/");
                })
        }

        function deleteSite(){
            WebsiteService
                .deleteWebsite(vm.websiteID)
                .success(function () {
                    $location.url("/user/" + vm.userID + "/website/");
                })

        }

    }
})();
