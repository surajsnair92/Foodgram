(function () {
    angular
        .module("Project")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {

        var api ={
            "createReview" : createReview,
            "findReviewById" : findReviewById,
            "updateReview" : updateReview,
            "deleteReview" : deleteReview,
            "findAllReviews" : findAllReviews,
            "findReviewsforRes" : findReviewsforRes,
            "deleteReviewsforUser" : deleteReviewsforUser
        };
        return api;

        function createReview(userID, review) {
            return $http.post("/api/user/" + userID + "/review", review);
        }

        function deleteReviewsforUser(userID) {
            return $http.post("/api/user/del/" + userID + "/review");
        }

        function findReviewById(reviewId) {
            return $http.get("/api/review/" + reviewId);
        }

        function updateReview(reviewId, review) {
            return $http.put("/api/review/" + reviewId, review);
        }

        function deleteReview(reviewId) {
            return $http.delete("/api/review/" + reviewId);
        }

        function findAllReviews(userID) {
            return $http.get("/api/user/" + userID + "/review");
        }

            function findReviewsforRes(restID) {
            return $http.get("/api/rest/" + restID + "/review");
        }

        }

})();