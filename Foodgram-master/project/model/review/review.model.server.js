module.exports = function (mongoose, q) {

    var ReviewSchema = require('./review.schema.server')(mongoose);
    var ReviewModel = mongoose.model('ReviewModel', ReviewSchema);


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

    function createReview(newReview) {
        return ReviewModel.create(newReview)
    }

    function deleteReviewsforUser(userID) {
        return ReviewModel.deleteMany({ user : userID })
    }

    function findReviewById(userId) {
        return ReviewModel.findById(userId)
    }

    function findAllReviews(userId) {
        return ReviewModel.find({user: userId})
                }

    function findReviewsforRes(rid) {
        return ReviewModel.find({placeID: rid})
    }

    function updateReview(reviewID, review) {
        return ReviewModel.update(
            { _id : reviewID },
            {
                description: review.description
            })
    }

    function deleteReview(reviewID) {
        return ReviewModel.findByIdAndRemove({_id: reviewID})
    }

};
