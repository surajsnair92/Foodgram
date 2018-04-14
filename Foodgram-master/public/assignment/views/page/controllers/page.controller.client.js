

(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("PageEditController", PageEditController)
        .controller("PageNewController", PageNewController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userID = $routeParams['uid'];
        vm.websiteID = $routeParams['wid'];


        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteID)
                .success(function (pages) {
                    vm.pages = angular.copy(pages);
                })
        }
        init();

    }

    function PageEditController($routeParams, PageService, $location) {
        var vm = this;
        vm.userID = $routeParams['uid'];
        vm.websiteID = $routeParams['wid'];
        vm.pageID = $routeParams['pid'];

        //Event Handlers
        vm.deletePage = deletePage;
        vm.editPage = editPage;


        function init() {
             PageService
                    .findPageById(vm.pageID)
                    .success(function (page) {
                        vm.page = page;
                    })
            PageService
                .findPageByWebsiteId(vm.websiteID)
                .success(function (pages) {
                    vm.pages = angular.copy(pages);
                })


        }
        init();

        function deletePage() {
            PageService
                .deletePage(vm.pageID)
                .success(function () {
                    $location.url("/user/" + vm.userID + "/website/" + vm.websiteID + "/page");
                })
        }

        function editPage(newPage) {
            PageService
                .updatePage(vm.pageID, newPage)
                .success(function () {
                    $location.url("/user/" + vm.userID + "/website/" + vm.websiteID + "/page");
                })

        }

    }

    function PageNewController($routeParams, PageService, $location, WebsiteService) {
        var vm = this;
        vm.userID = $routeParams['uid'];
        vm.websiteID = $routeParams['wid'];

        //Event Handlers
        vm.createPage = createPage;


        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteID)
                .success(function (pages) {
                    vm.pages = angular.copy(pages);
                })
        }
        init();

        function createPage(newPage) {
            PageService
                .createPage(vm.websiteID, newPage)
                .success(function (page) {
                    WebsiteService
                        .addPage(vm.websiteID, page._id)
                        .success(function () {
                            $location.url("/user/" + vm.userID + "/website/" + vm.websiteID + "/page");
                        });
                });
        }

    }

})();