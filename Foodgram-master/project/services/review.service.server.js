
module.exports = function (app, reviewModel) {
    app.post("/api/user/:userId/review", createReview);
    app.post("/api/user/del/:userId/review", deleteReviewsforUser);
    app.get("/api/user/:userId/review", findAllReviews);
    app.get("/api/rest/:rid/review", findReviewsforRes);
    app.get("/api/review/:reviewId", findReviewById);
    app.put("/api/review/:reviewId", updateReview);
    app.delete("/api/review/:reviewId", deleteReview);

    function createReview(req, res) {
        var userID = req.params.userId;
        var newWebsite = req.body;
        reviewModel.createReview(newWebsite)
            .then(function (website) {
                res.json(website);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteReviewsforUser(req, res) {
        var userID = req.params.userId;
        reviewModel.deleteReviewsforUser(userID)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findAllReviews(req, res) {
        var userId = req.params.userId;
        reviewModel.findAllReviews(userId)
            .then(function (reviews) {
                res.json(reviews);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findReviewsforRes(req, res) {
        var reviewID = req.params.rid;
        reviewModel.findReviewsforRes(reviewID)
            .then(function (reviews) {
                res.json(reviews);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findReviewById(req, res) {
        var ReviewId = req.params.reviewId;
        reviewModel.findReviewById(ReviewId)
            .then(function (website) {
                res.json(website);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updateReview(req, res) {
        var reviewId = req.params.reviewId;
        var review = req.body;
        reviewModel.updateReview(reviewId, review)
            .then(function (website) {
                res.json(website);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteReview(req, res) {
        var reviewId = req.params.reviewId;
        reviewModel.deleteReview(reviewId)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};