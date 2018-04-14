(function () {
    angular
        .module("Project")
        .controller("ReviewEditController", ReviewEditController);

    function ReviewEditController(UserService, ReviewService, $routeParams, $location, $rootScope){
        var vm = this;
        vm.admin = "admin";
        vm.rid = $routeParams['rid'];
        vm.userID = $routeParams['uid'];
        var uid = $routeParams['uid'];

        vm.editreview = editreview;
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
                .findAllReviews(uid)
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
            ReviewService
                .findReviewById(vm.rid)
                .success(function (review) {
                    vm.review = review;
                });
        }
        init();

        function editreview(review) {
            ReviewService
                .updateReview(vm.rid, review)
                .success(function () {
                    $location.url("/user/" + vm.userID + "/reviews/");
                })
        }

        function deleteReview() {
            ReviewService
                .deleteReview(vm.rid)
                .success(function () {
                    $location.url("/user/" + vm.userID + "/reviews/");
                })
        }
    }
})();