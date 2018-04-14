
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userID = $routeParams['uid'];
        vm.websiteID = $routeParams['wid'];
        vm.pageID = $routeParams['pid'];
        vm.widgetID = $routeParams['wgid'];


        //Event Handler
        vm.updateWid = updateWid;
        vm.deleteWidget = deleteWidget;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetID)
                .success(function (widget) {
                    vm.widget = widget;
                })
        }
        init();

        function updateWid(widget) {
            WidgetService
                .updateWidget(vm.widgetID, widget)
                .success(function () {
                    $location.url("/user/" + vm.userID + "/website/" + vm.websiteID + "/page/" + vm.pageID + "/widget");
                })
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetID)
                .success(function () {
                    $location.url("/user/" + vm.userID + "/website/" + vm.websiteID + "/page/" + vm.pageID + "/widget");
                })
        }

    }

})();
