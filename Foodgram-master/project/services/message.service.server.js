
module.exports = function (app, messsagemodel) {
    app.post("/api/message/:userId", createMessage);
    app.get("/api/message/user/:userId", findAllmessagesforId);
    app.delete("/api/delete/:mid", deleteMessage);
    app.delete("/api/messages/:uid",deleteMessagesforUser);

    function createMessage(req, res) {
        var userID = req.params.userId;
        var message = req.body;
        messsagemodel.createMessage(message)
            .then(function (message) {
                res.json(message);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteMessagesforUser(req, res) {
        var userID = req.params.uid;
        messsagemodel.deleteMessagesforUser(userID)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteMessage(req, res) {
        var mid = req.params.mid;
        messsagemodel.deleteMessage(mid)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findAllmessagesforId(req, res) {
        var userID = req.params.userId;
        messsagemodel.findAllmessagesforId(userID)
            .then(function (message) {
                res.json(message);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};