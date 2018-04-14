(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {

        var api = {
            "searchPhotos": searchPhotos,
        };
        return api;

        function searchPhotos(searchTerm) {
            var key = "b045a0e0069878634e734d86b01df996";
            var secret = "your-flickr-secret";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }

})();
