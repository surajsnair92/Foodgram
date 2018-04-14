(function () {
    angular
        .module("Project")
        .controller("ReviewController", ReviewController);


    function ReviewController(UserService, ReviewService, $routeParams, $location, $rootScope){
        var vm = this;
        vm.userID = $routeParams['uid'];
        var uid = $routeParams['uid'];
        vm.admin = "admin";
        /*vm.reviews = reviews;*/

        vm.submit = submit;
        vm.getDateFormat = getDateFormat;
        vm.deleteReview = deleteReview;
        vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(function(response) {
                    $rootScope.currentUser = null;
                    $location.url("/home");
                });
        }

        function init() {
            ReviewService
                .findAllReviews(vm.userID)
                .success(function (reviews) {
                vm.reviews = reviews;
            });
            UserService
                .findUserById(uid)
                .success(function (user) {
                    vm.user = user;
                    vm.lname = user.lastname;
                    vm.fname = user.username;
                });
        }
        init();

        function submit(review) {
            ReviewService
                .createReview(vm.userID, review)
                .success(function (newWebsite) {
                    UserService.addReview(vm.userID, newWebsite._id)
                        .success(function () {
                            init();
                        });
                });
        }

        function getDateFormat(timestamp) {
            return new Date(timestamp);
        }


        function deleteReview(rid) {
            ReviewService
                .deleteReview(rid)
                .success(function () {
                    $location.url("/user/" + vm.userID + "/reviews/");
                })
        }
    }
})();