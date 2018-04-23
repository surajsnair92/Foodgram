(function () {
    angular
        .module("Project")
        .controller("NewRestaurantController", NewRestaurantController);

    function NewRestaurantController($location,$routeParams, RestService, $scope){

        var model = this;
        model.userId = $routeParams['uid'];
        model.allrestlist =[]
        model.createRestaurant = createRestaurant;
        model.viewAllRestaurants = viewAllRestaurants;

        function createRestaurant(restaurant) {
            restaurant.user = model.userId
            RestService.createRestaurant(restaurant)
                .then(
                    function (restaurant) {
                        $location.url('user/'+model.userId)
                    }
                )

        }

        function viewAllRestaurants() {
            RestService.findRestaurantByUserId(model.userId)
                .then(function (restaurant) {

                })

        }
        function init() {
            RestService.findRestByUserId(model.userId)
                .then(function (restaurant) {
                    var obj = restaurant.data;
                    for(var i = 0; i < obj.length;i++){
                        model.allrestlist.push(obj[i])
                    }
                    console.log(model.allrestlist)
                });
        }
        init();


    }
})();