
module.exports = function (app, pageModel) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findPageByWebsiteId);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);
    app.post("/api/page/:pageId/widget/:widgetId", addWidget);

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var newPage = req.body;
        pageModel.createPage(websiteId, newPage)
            .then(function (page) {
                res.json(page);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findPageByWebsiteId(req, res) {
        var websiteId = req.params.websiteId;
        pageModel.findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.json(pages);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        pageModel.findPageById(pageId)
            .then(function (page) {
                res.json(page);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        pageModel.updatePage(pageId, newPage)
            .then(function (page) {
                res.json(page);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        pageModel.deletePage(pageId)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function addWidget(req, res) {
        var widgetId = req.params.widgetId;
        var pageId = req.params.pageId;
        pageModel.addWidget(pageId, widgetId)
            .then(function (widget) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

};