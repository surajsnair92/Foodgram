(function () {
    angular
        .module("Project")
            .controller("RestController", RestController);

    function RestController(UserService, RestService, ReviewService, $routeParams, $location, $rootScope){
        var vm = this;
        vm.rs;
        vm.restID = $routeParams['rid'];
        vm.userID = $routeParams['uid'];

        vm.submit = submit;
        vm.login = login;
        vm.getDateFormat = getDateFormat;
        vm.searchplace = searchplace;
        vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(function(response) {
                    $rootScope.currentUser = null;
                    $location.url("#/home");
                });
        }

        function login(user) {
            UserService
                .login(user)
                .then(function (response) {
                    if(response){
                        $rootScope.currentUser = response.data;
                        user = response.data;
                        if(user){
                            //console.log(user[0]);
                            //$rootScope.currentUser = user[0];
                            $location.url("/home/" + user._id + "/res/" + vm.restID);
                        }
                        else{
                            vm.error = "User not found";
                        }
                    }

                })
                .catch(function (err) {
                    vm.error = "Invalid Username/Password";
                })
        }

        function searchplace(word) {
            var key = {name: word};
            RestService
                .findPlaceByName(key)
                .success(function (data) {
                    vm.places = data;
                    if(vm.userID){
                    $location.url("/home/"+vm.userID + "/" + word);
                    }else {
                        $location.url("/home/guest/" + word + "/search");
                    }
                })
        }


        function getDateFormat(timestamp) {
            return new Date(timestamp); }


        function submit(rev) {
            UserService
                .findUserById(vm.userID)
                .success(function (user) {
                    vm.user = user;
                    vm.uid = vm.user._id;
                    vm.review.user = vm.userID;
                    vm.review.placeID = vm.restID;
                    vm.review.user_name = vm.user.username;
                    RestService
                        .findRestaurantByID(vm.restID)
                        .success(function (rest) {
                            vm.rest = rest;
                            vm.review.place = vm.rest.name;
                            ReviewService
                                .createReview(vm.userID, vm.review)
                                .success(function (newReview) {
                                    init();
                                    vm.review.description = ""
                                });
                        })


                })
        }


        function init() {
            ReviewService
                .findReviewsforRes(vm.restID)
                .success(function (data) {
                    vm.rs = data;
                });
            RestService
                .findRestaurantByID(vm.restID)
                .success(function (data) {
                    vm.details = data;
                    vm.name = vm.details.name;
                    vm.rating = (vm.details.user_rating.aggregate_rating / 5) * 100;
                    vm.range = (vm.details.price_range / 5) * 100;
                    vm.val = vm.details.has_online_delivery;
                    vm.pic = vm.details.featured_image;
                    vm.reserve = vm.details.has_table_booking;
                    vm.lat = vm.details.location.latitude;
                    vm.lon = vm.details.location.longitude;
                    RestService
                        .findNearByPlaces(vm.lat,vm.lon)
                        .success(function (data) {
                            vm.nearby = data;
                        })
                });


        }
        init();
    }
})();