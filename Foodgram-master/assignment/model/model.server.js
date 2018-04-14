module.exports = function (mongoose) {
    var q = require('q');

    var userModel       = require("./user/user.model.server")(mongoose, q);
    var websiteModel    = require("./website/website.model.server")(mongoose, q);
    var pageModel       = require("./page/page.model.server")(mongoose, q);
    var widgetModel     = require("./widget/widget.model.server")(mongoose, q);

    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel:pageModel,
        widgetModel:widgetModel
    };

    return model;
};
