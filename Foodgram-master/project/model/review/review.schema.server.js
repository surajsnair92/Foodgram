module.exports = function (mongoose) {

    var ReviewSchema = mongoose.Schema({
        placeID: String,
        user_name: String,
        type: String,
        place: String,
        description: String,
        user: String,
        date: { type: Date, default: Date.now }
    }, {collection: 'project.reviews'});

    return ReviewSchema;
};