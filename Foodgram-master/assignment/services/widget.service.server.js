
module.exports = function (app, widgetModel) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.put("/api/flickr/:widgetId", updateWidgetFlickr);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/page/:pageId/widget", reorderWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);


    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var newWidget = req.body;
        widgetModel.createWidget(pageId, newWidget)
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findWidgetsByPageId(req, res) {
        var pageId = req.params.pageId;
        widgetModel.findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel.findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var newWidget = req.body;
        widgetModel.updateWidget(widgetId, newWidget)
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel.deleteWidget(widgetId)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var userId         = req.body.userId;
        var pageId         = req.body.pageId;
        var websiteId      = req.body.websiteId;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        var serverPath = "../../../../../uploads/"+filename;


        widgetModel.findWidgetById(widgetId)
            .then(function (widget) {
                widget.url = serverPath;
                widget.width = width;
                widgetModel.updateWidget(widgetId, widget)
                   .then(function (updatedWidget) {
                         res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
                         },function (failedUpdate) {
                         res.sendStatus(400).send(failedUpdate);
                         });
                },function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function updateWidgetFlickr(req, res) {
        var widgetId = req.params.widgetId;
        var link = req.body;
        widgetModel.updateWidgetFlickr(widgetId, link.url)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }

    function reorderWidget(req, res) {
        var pageId = req.params.pageId;
        var newmap = req.body;
        widgetModel.reorderWidget(pageId, newmap)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

};