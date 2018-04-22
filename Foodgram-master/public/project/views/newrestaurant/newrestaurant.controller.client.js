(function () {
    angular
        .module("Project")
        .controller("NewRestaurantController", NewRestaurantController);

    function NewRestaurantController($location, RestService){

        var model = this;

        model.createRestaurant = createRestaurant;

        function createRestaurant(restaurant) {
            RestService.createRestaurant(restaurant)
                .then(
                    function (restaurant) {
                        $location.url('project/views/home/home.html')
                    }
                )

        }


    }
})();