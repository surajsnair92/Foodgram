(function () {
    angular
        .module("Project")
        .factory("RestService", RestService);

    function RestService($http) {

        var api ={
            "createRestaurant" : createRestaurant,
            "findAllCategories" : findAllCategories,
            "findRestaurantByID" : findRestaurantByID,
            "findNearByPlaces" : findNearByPlaces,
            "findPlaceByName" : findPlaceByName,
            "findPlaceByCity" : findPlaceByCity,
            "findRestByUserId": findRestByUserId
        };
        return api;

        function createRestaurant(restaurant) {

            restaurant.location.streetAddress1 = restaurant.location.streetAddress1.split(' ').join('+');
            restaurant.location.streetAddress2 = restaurant.location.streetAddress2.split(' ').join('+');
            // console.log( restaurant.location.streetAddress1);
            // console.log( restaurant.location.streetAddress2);
            var str = "https://maps.googleapis.com/maps/api/geocode/json?address="+restaurant.location.streetAddress1+",+"+restaurant.location.streetAddress2+",+"+restaurant.location.city+"&key=AIzaSyC98Xbpx1VetC0jixHstgdZ1ruOxVTWhzc";
            // var Location = $http.post(str)
            $http.post(str)
                .then(function(res){
                    // var lat
                    console.log(res);
                    restaurant.location.latitude = res.data.results[0].geometry.location.lat;
                    restaurant.location.longitude = res.data.results[0].geometry.location.lng;
                    // console.log(res.data.results[0].geometry.location)

                });
            return $http.post("/api/rest/create", restaurant)
        }
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
            // console.log(name);
            return $http.post("/api/rest/place/name",name);
        }

        function findPlaceByCity(city) {
            return $http.post("/api/rest/place/city",city);
        }
        function findRestByUserId(userId) {
            return $http.get("/api/allrest/" + userId);
        }

    }

})();