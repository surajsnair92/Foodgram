module.exports = function (mongoose, q) {

    var RestaurantSchema = require('./restaurant.schema.server')(mongoose);
    var RestaurantModel = mongoose.model('RestaurantModel', RestaurantSchema);


    var api ={
        "createRestaurant" : createRestaurant,
        "findRestaurantByName" : findRestaurantByName,
        "findRestaurantById" : findRestaurantById,
        "updateRestaurant" : updateRestaurant,
        "deleteRestaurant" : deleteRestaurant,
    };
    return api;

    function createRestaurant(restaurant) {
        // console.log(restaurant)
        return RestaurantModel.create(restaurant)
    }

    function findRestaurantByName(name) {
        return RestaurantModel.find({name: name})
    }

    function findRestaurantById(rId) {
        return RestaurantModel.findByIdAndRemove({_id: rId})
    }

    function deleteRestaurant(rId) {
        return RestaurantModel.delete({to_id : rId })
    }


    function updateRestaurant(rId, restaurant) {
        return RestaurantModel.update(
            { _id : rId },restaurant,function(err,affected) {
                console.log('affected rows %d', affected);

            });
    }

};
