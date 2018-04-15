module.exports = function (mongoose) {

    var RestaurantSchema = mongoose.Schema({
        name: String,
        average_cost_for_two: { type: Number},
        rating: {type: Number, min:1,max:5,default: 3},
        price_range: Number,
        has_online_delivery:Number,
        has_table_booking:Number,
        featured_image: String,
        cuisines: String,
        location: { address: String, city: String, zipcode:Number, latitude:Number, longitude:Number }
    }, {collection: 'myRestaurants'});

    return RestaurantSchema;
};