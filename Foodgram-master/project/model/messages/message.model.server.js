module.exports = function (mongoose, q) {

    var MessageSchema = require('./message.schema.server')(mongoose);
    var MessageModel = mongoose.model('MessageModel', MessageSchema);


    var api ={
        "createMessage" : createMessage,
        "findAllmessagesforId" : findAllmessagesforId,
        "deleteMessage": deleteMessage,
        "deleteMessagesforUser" : deleteMessagesforUser
    };
    return api;

    function createMessage(message) {
        return MessageModel.create(message)
    }

    function findAllmessagesforId(userID) {
        return MessageModel.find({to_id: userID})
    }

    function deleteMessage(mid) {
        return MessageModel.findByIdAndRemove({_id: mid})
    }

    function deleteMessagesforUser(uid) {
        return MessageModel.deleteMany({to_id : uid })
    }

};
