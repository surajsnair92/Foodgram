(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($routeParams, WidgetService, $location) {
        var app = this;
        app.uid = $routeParams.uid;
        app.wid = $routeParams.wid;
        app.pid = $routeParams.pid;
        app.wdid = $routeParams.wgid;

        // Event Handlers
        app.addHeaderWidget = addHeaderWidget;
        app.addImageWidget = addImageWidget;
        app.addYouTubeWidget = addYouTubeWidget;


        function addYouTubeWidget() {
            var newvideo = {"widgetType": "YOUTUBE", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" };
            var NewYou = WidgetService.createWidget(app.pid, newvideo);
            $location.url("/user/" + app.uid + "/website/" + app.wid + "/page/" + app.pid + "/widget/" + NewYou._id);
        }

        function addImageWidget() {
            var newimage = {"widgetType": "IMAGE", "width": "100%", "url": "http://lorempixel.com/400/200/"};
            var NewImg = WidgetService.createWidget(app.pid, newimage);
            console.log(app.uid);
            console.log(app.wid);
            $location.url("/user/" + app.uid + "/website/" + app.wid + "/page/" + app.pid + "/widget/" + NewImg._id);
        }
        
        function addHeaderWidget() {
            var newheader ={"widgetType": "HEADER", "size": "3", "text": "GIZMODO"};
            var NewHead = WidgetService.createWidget(app.pid, newheader);
            $location.url("/user/" + app.uid + "/website/" + app.wid + "/page/" + app.pid + "/widget/" + NewHead._id);
        }


    }
})();