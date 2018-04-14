(function () {
    angular
        .module('wbdvDirectives', [])
        .directive('wamSortable', wamSortable);

    function wamSortable($http, $routeParams) {
        function linkFunc(scope, element, attributes) {
            var pageId = $routeParams["pid"];
            element.sortable({
                axis: 'y',
                start : function (event, ui) {
                    initialIndex = ui.item.index();
                },
                stop : function (event, ui) {
                    finalIndex = ui.item.index();
                    var newMap = {};
                    $.map($(this).find('div'), function(el) {
                        if(el.id) {
                            id = el.id;
                            index = $(el).index();
                            newMap[id] = index;
                        }
                    });
                    $http.put("/page/"+pageId+"/widget?start=" + initialIndex + "&end="+ finalIndex, newMap);
                }});
        }

        return {
            link: linkFunc
        };
    }
})();