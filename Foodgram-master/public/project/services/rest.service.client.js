(function () {
    angular
        .module("Project")
        .factory("RestService", RestService);

    function RestService($http) {

        var api ={
            "findAllCategories" : findAllCategories,
            "findRestaurantByID" : findRestaurantByID,
            "findNearByPlaces" : findNearByPlaces,
            "findPlaceByName" : findPlaceByName,
            "findPlaceByCity" : findPlaceByCity
        };
        return api;

        function findAllCategories(a) {
            return $http.post("/api/rest/categories/near/", a);
        }

        function findRestaurantByID(restId) {
            return $http.get("/api/rest/" + restId);
        }

        function findNearByPlaces(lat, lon) {
            var loc = {"latitude": lat,
            "longitude": lon};
            return $http.post("/api/rest/places/near/", loc);
        }

        function findPlaceByName(name) {
            console.log(name);
            return $http.post("/api/rest/place/name",name);
        }

        function findPlaceByCity(city) {
            return $http.post("/api/rest/place/city",city);
        }

    }

})();