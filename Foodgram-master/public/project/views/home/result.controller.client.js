(function () {
    angular
        .module("Project")
        .controller("ResultController", ResultController);

    function ResultController($location, RestService, $routeParams, UserService, $rootScope){
        var vm = this;
        vm.search = $routeParams['word'];
        vm.userID = $routeParams['uid'];
        var skey = {name: vm.search};
        vm.searchplace = searchplace;
        vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(function(response) {
                    $rootScope.currentUser = null;
                    $location.url("/");
                });
        }


        function searchplace(word) {
            $.getJSON('//ipinfo.io/json', function(data) {
                (JSON.stringify(data, null, 2));
                latLong = data.loc.split(",");
                vm.lat = latLong[0];
                vm.lon = latLong[1];
                var obj = {
                    name: word,
                    lat: vm.lat,
                    lon: vm.lon
                };
                RestService
                    .findPlaceByName(obj)
                    .success(function (data) {
                        vm.places = data;
                        $location.url("/home/guest/" + word + "/search");
                    })
            })

        }

        function init() {
            $.getJSON('//ipinfo.io/json', function(data) {
                (JSON.stringify(data, null, 2));
                latLong = data.loc.split(",");
                vm.lat = latLong[0];
                vm.lon = latLong[1];
                a = {lati: vm.lat, lngi: vm.lon};
                RestService
                    .findPlaceByName(a)
                    .success(function (data) {
                        if(data.length == 0) {
                            vm.display = "Please enable location services";
                        }else {
                            vm.places = data;
                            vm.pic = vm.places.featured_image;
                        }
                    });
            });


        }
        init();


    }
})();