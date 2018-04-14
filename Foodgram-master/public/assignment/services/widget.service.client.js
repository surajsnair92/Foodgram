(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", widgetService);

    function widgetService($http) {

        var api ={
            "createWidget" : createWidget,
            "findWidgetsByPageId" : findWidgetsByPageId,
            "findWidgetById" : findWidgetById,
            "updateWidget" : updateWidget,
            "deleteWidget" : deleteWidget,
            "updateWidgetFlickr" : updateWidgetFlickr
        };
        return api;

        function createWidget(pageId, widget) {
            return $http.post("/api/page/" + pageId + "/widget", widget);
        }

        function findWidgetsByPageId(pageId) {
            return $http.get("/api/page/"+ pageId + "/widget");
        }

        function updateWidget(widgetId, widget) {
            return $http.put("/api/widget/" + widgetId, widget);
        }

        function findWidgetById(widgetId) {
            return $http.get("/api/widget/" + widgetId);
        }

        function deleteWidget(widgetId) {
            return $http.delete("/api/widget/"+ widgetId);
        }

        function updateWidgetFlickr(widgetId, url) {
            var link = {url: url};
            return $http.put("/api/flickr/"+widgetId, link);
        }

    }

})();