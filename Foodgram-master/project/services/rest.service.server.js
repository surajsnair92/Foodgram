
module.exports = function (app, z) {

    var locapi = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    var location = "Boston,+MA";
    var key =  "&key=AIzaSyC89pv2EHlwGL9eio5DFM_FMRIhoLz9s8Q";
    app.post("/api/rest/categories/near/", findAllCategories);
    app.get("/api/rest/:restId", findRestaurantByID);
    app.post("/api/rest/places/near/", findNearByPlaces);
    app.post("/api/rest/place/name", findPlaceByName);
    app.post("/api/rest/place/city", findPlaceByCity);


    function findPlaceByName(req, res) {
        var obj = req.body;
        var name = obj.name;
        var lat = obj.lati;
        var lon = obj.lngi;

        z
            .search({
                q: name,
                lat: lat,
                lon: lon
            },
        function (err, result) {
            if (!err) {
                console.log(result);
                res.json(result)
            } else {
                console.log(err);
            }
        });
    }

    function findPlaceByCity(req, res) {
        var obj = req.body;
        var city = obj.city;
        z
            .search(),
        function (err, result) {
            if (!err) {
                res.json(result);
            } else {
                console.log(err);
            }
        };
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
                },
                function (err, result) {
                    if (!err) {
                        res.json(result);
                    } else {
                        console.log(err);
                    }
                });
    }




    function findNearByPlaces(req, res) {
        var loc = req.body;
        z
            .search({
                lat: loc.latitude,
                lon: loc.longitude,
                start:1
            },
        function (err, result) {
            if (!err) {
                res.json(result);
            } else {
                console.log(err);
            }
        });
    }

    function findRestaurantByID(req, res) {
        var restId = req.params.restId;
        z
            .restaurant({
                res_id: restId
            },function (err, result) {
                if (!err) {
                    res.json(result);
                } else {
                    console.log(err);
                }
            });
    }

    };