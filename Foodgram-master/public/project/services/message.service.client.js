(function () {
    angular
        .module("Project")
        .factory("MessageService", MessageService);

    function MessageService($http) {

        var api ={
            "createMessage" : createMessage,
            "findAllmessagesforId" : findAllmessagesforId,
            "deleteMessage" : deleteMessage,
            "deleteMessagesforUser" : deleteMessagesforUser
            /*"findReviewById" : findReviewById,
            "updateReview" : updateReview,
            "deleteReview" : deleteReview,
            "findAllReviews" : findAllReviews,
            "findReviewsforRes" : findReviewsforRes*/
        };
        return api;

        function createMessage(userID,message) {
            return $http.post("/api/message/" + userID , message);
        }

        function findAllmessagesforId(userID) {
            return $http.get("/api/message/user/" + userID);
        }

        function deleteMessage(mid) {
            return $http.delete("/api/delete/" + mid);
        }

        function deleteMessagesforUser(uid) {
            return $http.delete("/api/messages/" + uid);
        }

/*

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

*/
    }

})();