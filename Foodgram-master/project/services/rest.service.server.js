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
            })
            .then(function(data) {
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

};