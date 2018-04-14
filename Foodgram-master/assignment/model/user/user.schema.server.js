module.exports = function (mongoose) {

    var UserSchema = mongoose.Schema({
        username: {type: String},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type:mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}],
        dateCreated: { type: Date, default: Date.now },
        facebook: {
            id:    String,
            token: String
        }
    }, {collection: 'assignment.user'});

    UserSchema.post('remove', function () {
        var user = this;
        var websiteModel = require('../website/website.model.server');
        var PageModel = require('../page/page.model.server');
        var widgetModel = require('../widget/widget.model.server');
        PageModel.find({_website: {$in: user.websites}}, '_id', function (err, pages) {
            if(err == null) {
                widgetModel.remove({_page: {$in: pages}}).exec();
                PageModel.remove({_id: {$in: pages}}).exec();
            }
        });
        websiteModel.remove({_id: {$in: user.websites}}).exec();
    });

    return UserSchema;
};