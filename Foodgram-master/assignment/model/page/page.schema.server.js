module.exports = function (mongoose) {

    var PageSchema = mongoose.Schema({
        _website: {type:mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'},
        name: String,
        title: String,
        description: String,
        widgets: [{type:mongoose.Schema.Types.ObjectId, ref: 'WidgetModel'}],
        dateCreated: { type: Date, default: Date.now }
    }, {collection: 'assignment.page'});

    PageSchema.post('remove', function () {
        var page = this;
        var websiteModel = require('../website/website.model.server');
        var widgetModel = require('../widget/widget.model.server');
        websiteModel.findWebsiteById(page._website)
            .then(function (website) {
                var index = website.pages.indexOf(page._id);
                if(index > -1) {
                    website.pages.splice(index, 1);
                    website.save();
                }
            });
        widgetModel.remove({_id: {$in: page.widgets}}).exec();
    });

    return PageSchema;
};

