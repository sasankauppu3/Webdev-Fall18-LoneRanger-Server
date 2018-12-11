module.exports = function (app) {
    var session = require('express-session');
    var apiKey = 'TSi4Z5LG-tAaq0tZ26MBclvKKt5JmeAZUXq0ZJqoDBe85cQe7LvgQDx1ALQt7tIea0Auyu1JB7ITRQNWva1ne6oOoffBlMWspsUc537jfDHunS3MfX-qovzKrND5W3Yx'
    const yelp = require('yelp-fusion');

    const client = yelp.client(apiKey);

    app.use(session({
        resave: false,
        saveUninitialized: true,
        duration: 30 * 60 * 1000,
        activeDuration: 30 * 60 * 1000,
        secret: 'secret'
    }));


    findRestaurantByNameAndLocation = (req, res) => {
        var name = req.params['name'];
        var location = req.params['location'];
        console.log(name)
        console.log(location)
        const searchRequest = {
            term: name,
            location: location
        };
        client.search(searchRequest).then(response => {
            console.log(response.jsonBody.businesses)
            res.send(response.jsonBody.businesses);
        }).catch(e => {
            res.send(e);
        });};

    findAllRestaurantsByLocation = (req, res) => {
        var location = req.params['location'];
        const searchRequest = {
            location: location
        };
        client.search(searchRequest).then(response => {
            res.send(response.jsonBody.businesses);
        }).catch(e => {
            res.send(e);
        });};



    findRestaurantByNameAndIdAndLocation = (req, res) => {
        console.log("fds");
        var Id = req.params['rid'];
        var name = req.params['name'];
        var lat = req.params['lat'];
        var lng = req.params['lng'];
        const searchRequest = {
            term: name,
            latitude: lat,
            longitude: lng
        };
        var result;
        client.search(searchRequest).then(response => {
            restaurantList = response.jsonBody.businesses;
            for(var i = 0; i < restaurantList.length; i++){
                if(restaurantList[i].hasOwnProperty('id') && restaurantList[i]['id'] === Id) {
                    result = restaurantList[i];
                    console.log(result)
                    res.send(result);
                    break;
                }
            }
            // res.send(response.jsonBody.businesses)
        }).catch(e => {
            res.send(e);
        });};

    //USER REST API CALLS
    app.get('/api/restaurant/name/:name/location/:location', findRestaurantByNameAndLocation);
    app.get('/api/restaurant/location/:location', findAllRestaurantsByLocation);
    app.get('/api/restaurant/name/:name/rid/:rid/lat/:lat/lng/:lng', findRestaurantByNameAndIdAndLocation);

}