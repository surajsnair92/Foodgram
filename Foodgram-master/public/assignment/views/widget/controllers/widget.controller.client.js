
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController);


    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.userID = $routeParams['uid'];
        vm.websiteID = $routeParams['wid'];
        vm.pageID = $routeParams['pid'];
        

        vm.doYouTrustURL = doYouTrustURL;
        vm.getTrustedHtml = getTrustedHtml;


        function init() {
            var initialIndex = -1;
            var finalIndex = -1;
            WidgetService
                .findWidgetsByPageId(vm.pageID)
                .success(function (widgets) {
                    vm.widgets = angular.copy(widgets);
                    vm.widgets.sort(function(a,b) {return (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0);} );
                });



        }
        init();

        function doYouTrustURL(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlparts = url.split("/");
            var id = urlparts[urlparts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }
    }

    function NewWidgetController($routeParams, WidgetService, $location, PageService) {
        var vm = this;
        vm.userID = $routeParams['uid'];
        vm.websiteID = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        //Event Handlers
        vm.newHeaderWidget = newHeaderWidget;
        vm.newImageWidget = newImageWidget;
        vm.newYouTubeWidget = newYouTubeWidget;
        vm.newHTMLWidget = newHTMLWidget;
        vm.newTextWidget = newTextWidget;

        function init() {
        }
        init();

        function newHeaderWidget() {
            var headerWidget ={"type": "HEADING", "size": 2, "text": "New Header"};
            WidgetService
                .createWidget(vm.pageId, headerWidget)
                .then(function (headerWidget) {
                    headerWidget = headerWidget.data;
                    var widgetId = headerWidget._id;
                    PageService.addWidget(vm.pageId, widgetId)
                        .then(function (page) {
                            $location.url("/user/" + vm.userID + "/website/" + vm.websiteID + "/page/" + vm.pageId + "/widget/"+headerWidget._id);
                        })
                });
        }

        function newImageWidget() {
            var imageWidget = {"type": "IMAGE", "width": "100%",
                "url": "http://lorempixel.com/400/200/"};
            WidgetService
                .createWidget(vm.pageId, imageWidget)
                .then(function (imageWidget) {
                    imageWidget = imageWidget.data;
                    var widgetId = imageWidget._id;
                    PageService.addWidget(vm.pageId, widgetId)
                        .then(function (doc) {
                            $location.url("/user/" + vm.userID + "/website/" + vm.websiteID + "/page/" + vm.pageId + "/widget/"+imageWidget._id);
                        })
                });
        }

        function newYouTubeWidget() {
            var youTubeWidget ={"type": "YOUTUBE", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" };
            WidgetService
                .createWidget(vm.pageId, youTubeWidget)
                .then(function (youTubeWidget) {
                    youTubeWidget = youTubeWidget.data;
                    var widgetId = youTubeWidget._id;
                    PageService.addWidget(vm.pageId, widgetId)
                        .then(function (page) {
                            $location.url("/user/" + vm.userID + "/website/" + vm.websiteID + "/page/" + vm.pageId + "/widget/"+youTubeWidget._id);
                        })
                });
        }

        function newHTMLWidget() {
            var HTMLWidget ={"type": "HTML", "text": "sample text"};
            WidgetService
                .createWidget(vm.pageId, HTMLWidget)
                .then(function (HTMLWidget) {
                    HTMLWidget = HTMLWidget.data;
                    PageService.addWidget(vm.pageId, HTMLWidget._id)
                        .then(function (page) {
                            $location.url("/user/" + vm.userID + "/website/" + vm.websiteID + "/page/" + vm.pageId + "/widget/"+HTMLWidget._id);
                        })
                });
        }
        
        function newTextWidget() {
            var textWidget ={"type": "TEXT", "rows": 5, "placeholder": "Insert text",
                "formatted": "false" };
            WidgetService
                .createWidget(vm.pageId, textWidget)
                .then(function (textWidget) {
                    textWidget = textWidget.data;
                    PageService.addWidget(vm.pageId, textWidget._id)
                        .then(function (page) {
                            $location.url("/user/" + vm.userID + "/website/" + vm.websiteID + "/page/" + vm.pageId + "/widget/"+textWidget._id);
                        })
                });
        }
    }

})();
