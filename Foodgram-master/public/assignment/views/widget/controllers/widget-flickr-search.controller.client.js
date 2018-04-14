(function () {
    var app = angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);


    function FlickrImageSearchController(FlickrService, WidgetService, $routeParams, $location) {
        var vm = this;
        vm.userID = $routeParams["uid"];
        vm.websiteID = $routeParams["wid"];
        vm.pageID = $routeParams["pid"];
        vm.widgetID = $routeParams["wgid"];

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos (searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server;
            url += '/' + photo.id + '_' + photo.secret + '_b.jpg';
            WidgetService
                .updateWidgetFlickr(vm.widgetID, url)
                .then(function (res) {
                    $location.url("/user/" + vm.userID + "/website/" + vm.websiteID + "/page/" + vm.pageID + "/widget/"+vm.widgetID);
                });
        }
    }

})();