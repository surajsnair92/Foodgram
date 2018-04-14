module.exports = function (mongoose) {

    var widgets = ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT'];
    var WidgetSchema = mongoose.Schema({
        _page: {type:mongoose.Schema.Types.ObjectId, ref: 'PageModel'},
        type: {type: String, enum: widgets},
        name: String,
        text: String,
        placeholder: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        index: String,
        dateCreated: { type: Date, default: Date.now }
    }, {collection: 'assignment.widget'});

    WidgetSchema.post('remove', function () {
        var widget = this;
        var pageModel = require('../page/page.model.server');
        pageModel.findPageById(widget._page)
            .then(function (page) {
                var index = page.widgets.indexOf(widget._id);
                if (index > -1) {
                    page.widgets.splice(index, 1);
                    page.save();
                }
            });
    });

    return WidgetSchema;
};