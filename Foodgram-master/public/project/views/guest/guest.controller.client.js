(function () {
    angular
        .module("Project")
        .controller("GuestController", GuestController);

    function GuestController($location, RestService, UserService, $routeParams, $rootScope, $http){
        var vm = this;
        var initkey = $routeParams['key'];
        var key = {name: vm.search};

        vm.login = login;
        vm.searchplace = searchplace;


        function login(user) {
            UserService
                .login(user)
                .then(function (response) {
                    if (response) {
                        $rootScope.currentUser = response.data;
                        user = response.data;
                        if (response) {
                            user = response.data;
                            if (user) {
                                if (initkey) {
                                    $location.url("/home/" + user._id + "/" + initkey);
                                }
                                else {
                                    $location.url("/home/" + user._id);
                                }
                            }
                            else {
                                vm.error = "User not found";
                            }
                        }
                    }
                })
                    .catch(function (err) {
                        vm.error = "Invalid Username/Password";
                    })
        }




        function searchplace(word) {
            $.getJSON('//ipinfo.io/json', function(data) {
                (JSON.stringify(data, null, 2));
                latLong = data.loc.split(",");
                vm.lat = latLong[0];
                vm.lon = latLong[1];
                        var obj = {name: word,
                        lat:vm.lat,
                        lon:vm.lon};
                    RestService
                        .findPlaceByName(obj)
                        .success(function (data) {
                            vm.places = data.restaurants;
                            $location.url("/home/guest/"+word+ "/search");
                        })
            })

        }


        function init() {
            $.getJSON('//ipinfo.io/json', function(data) {
                (JSON.stringify(data, null, 2));
                latLong = data.loc.split(",");
                vm.lat = latLong[0];
                vm.lon = latLong[1];
                a = {lati: vm.lat, lngi: vm.lon, name:initkey};

                RestService
                    .findPlaceByName(a)
                    .success(function (data) {
                        console.log(data)
                        if(data.length == 0) {
                            vm.display = "Please enable location services";
                        }else {

                            vm.places = data.restaurants;
                            vm.pic = vm.places.featured_image;
                        }
                    });
            });
        }
        init();


    }
})();