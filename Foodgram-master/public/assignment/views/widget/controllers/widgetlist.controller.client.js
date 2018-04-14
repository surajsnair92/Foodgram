(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);
    
    function WidgetListController($sce, $routeParams, WidgetService) {
        var app = this;
        app.userId = $routeParams.uid;
        app.wid = $routeParams.wid;
        app.pid = $routeParams.pid;

        // Event Handlers
        app.getYoutubeUrl = getYoutubeUrl;
        app.getTrustedHtml = getTrustedHtml;
        app.widgetTemplateUrl = widgetTemplateUrl; 

        app.widgets = WidgetService.findWidgetsByPageId(app.pid);

        function getTrustedHtml(text) {
            return $sce.trustAsHtml(text);
        }

        function widgetTemplateUrl(widgetType) {
            var url = 'views/widget/templates/widget-'+widgetType+'.view.client.html';
            return url;
        }
        
        function getYoutubeUrl(wurl) {
            var urlParts = wurl.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
    }
})();