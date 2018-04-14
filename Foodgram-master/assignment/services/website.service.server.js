
module.exports = function (app, WebsiteModel) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findWebsitesByUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);
    app.put("/api/website/:websiteId/page/:pageId", addPage);

    function createWebsite(req, res) {
        var userID = req.params.userId;
        var newWebsite = req.body;
        WebsiteModel.createWebsiteForUser(userID, newWebsite)
            .then(function (website) {
                res.json(website);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findWebsitesByUser(req, res) {
        var userId = req.params.userId;
        WebsiteModel.findAllWebsitesForUser(userId)
            .then(function (websites) {
                res.json(websites);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        WebsiteModel.findWebsiteById(websiteId)
            .then(function (website) {
                res.json(website);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        WebsiteModel.updateWebsite(websiteId, newWebsite)
            .then(function (website) {
                res.json(website);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        WebsiteModel.deleteWebsite(websiteId)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function addPage(req, res) {
        var websiteId = req.params.websiteId;
        var pageId = req.params.pageId;
        WebsiteModel.addPage(websiteId, pageId)
            .then(function (website) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};