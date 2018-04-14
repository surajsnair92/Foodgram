
module.exports = function (app, z, IPinfo) {


    var mongoose = require('mongoose');


    var connectionString = 'mongodb://127.0.0.1:27017/project';

    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    mongoose.connect(connectionString, function (err, db) {
        if(err){
            console.log(err);
        }
    });


    var usermodel = require("./model/user/user.model.server")(mongoose);
    var reviewmodel = require("./model/review/review.model.server")(mongoose);
    var messagemodel = require("./model/messages/message.model.server")(mongoose);

    require("./services/user.service.server.js")(app, usermodel, z, IPinfo);
    require("./services/review.service.server.js")(app, reviewmodel);
    require("./services/message.service.server")(app, messagemodel);
    require("./services/rest.service.server")(app, z);

    /*var model = require('./model/models.server')(mongoose);




    require("./services/user.service.server.js")(app, model.userModel);
    require("./services/website.service.server.js")(app, model.websiteModel);
    require("./services/page.service.server.js")(app, model.pageModel);
    require("./services/widget.service.server.js")(app, model.widgetModel);*/
};