module.exports = function (app, z, RestaurantModel) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/project/uploads'});
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    // var locapi = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    // var location = "Boston,+MA";
    // var key =  "&key=AIzaSyC89pv2EHlwGL9eio5DFM_FMRIhoLz9s8Q";
    app.post("/api/rest/create", createRestaurant);
    app.post("/api/rest/categories/near/", findAllCategories);
    app.get("/api/rest/:restId", findRestaurantByID);
    app.post("/api/rest/places/near/", findNearByPlaces);
    app.post("/api/rest/place/name", findPlaceByName);
    app.post("/api/rest/place/city", findPlaceByCity);

    function uploadImage(req, res) {

        var restaurant         = req.body.restaurant;
        var myFile        = req.file;
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;


        restaurant.featured_image = originalname;
        console.log(restaurant.featured_image)
        console.log("hleeo from rest server:",restaurant);
        res.send(200);

}


    function findPlaceByName(req, res) {
        var obj = req.body;
        var name = obj.name;
        var lat = obj.lati;
        var lon = obj.lngi;
        var myRes;
        RestaurantModel
            .findRestaurantByName(name)
            .then(function (data) {
                myRes = data;
            });
        z
            .search({
                q: name,
                lat: lat,
                lon: lon
            })
            .then(function(data) {
                // data.restaurants.push({
                //     featured_image: '',
                //     test:'test'
                // }
                // for(obj in myRes){
                //     console.log("JAiiiii:",obj._id)
                //     // data.restaurants.add(myRes)
                // }
                if(myRes.length === 0){
                    res.json(data);
                    return;
                }

                data.restaurants.push({
                    apiKey: '167c084567684c2076a14d3c0b36bc29',
                    id: myRes[0]._id,
                    name: myRes[0].name,
                    average_cost_for_two: myRes[0].average_cost_for_two,
                    price_range: myRes[0].price_range,
                    has_online_delivery: myRes[0].has_online_delivery,
                    has_table_booking: myRes[0].has_table_booking,
                    cuisines: myRes[0].cuisines,
                    location:{
                        latitude: myRes[0].location.latitude,
                        longitude: myRes[0].location.longitude
                    }
                });
                console.log("mama",data);
                res.json(data);
            })
            .catch(function(err) {
                res.send(err);
            });
    }

    function findPlaceByCity(req, res) {
        var obj = req.body;
        var city = obj.city;
        z
            .search()
            .then(function(data) {
                res.json(data);
            })
            .catch(function(err) {
                res.json(err);
            });
    }


    function findAllCategories(req, res) {
        var loc = req.body;
        var lat = loc.lati;
        var lon = loc.lngi;
        z
            .search({
                lat: lat,
                lon: lon,
                count: 9
            })
            .then(function(data) {
                res.json(data);
            })
            .catch(function(err) {
                res.send(err);
            });
    }

    function findNearByPlaces(req, res) {
        var loc = req.body;
        z
            .search({
                lat: loc.latitude,
                lon: loc.longitude,
                start:1
            })
            .then(function(data) {
                res.send(data);
            })
            .catch(function(err) {
                res.send(err);
            });
    }

    function findRestaurantByID(req, res) {
        var restId = req.params.restId;
        z
            .restaurant({
                res_id: restId
            })
            .then(function(data) {
                res.json(data);
            })
            .catch(function(err) {
                res.send(err);
            });

    }

    function createRestaurant(req,res){
        var newRestaurant = req.body;
        console.log(newRestaurant);

        RestaurantModel.createRestaurant(newRestaurant)
            .then(function (restaurant) {
                res.json(restaurant);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

};