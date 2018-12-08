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


    findRestaurantByName = (req, res) => {
        var name = req.params['name'];
        const searchRequest = {
            term: name,
            location: 'Boston'
        };
        client.search(searchRequest).then(response => {
            res.send(response.jsonBody.businesses);
        }).catch(e => {
            res.send(e);
        });};

    findAllRestaurantsByLocation = (req, res) => {
        var location = req.params['location'];
        console.log(location)
        const searchRequest = {
            location: location
        };
        client.search(searchRequest).then(response => {
            res.send(response.jsonBody.businesses);
        }).catch(e => {
            res.send(e);
        });};

    findRestaurantByNameAndID = (req, res) => {
        var name = req.params['name'];
        var Id = req.params['Id'];
        var location = req.params['location'];
        console.log('name')
        console.log(Id)
        console.log(location)
        const searchRequest = {
            term: name,
            location: location
        };
        client.search(searchRequest).then(response => {
            var restaurantList = response.jsonBody.businesses;
            var result;
            for(var i = 0; i < restaurantList.length; i++){
                if(restaurantList[i].hasOwnProperty('id') && restaurantList[i]['id'] === Id) {
                    result = restaurantList[i];
                    res.send(result);
                    break;
                }
            }

        }).catch(e => {
            res.send(e);
        });};




    //USER REST API CALLS
    app.get('/api/restaurant/name/:name', findRestaurantByName);
    app.get('/api/restaurant/location/:location', findAllRestaurantsByLocation);
    app.get('/api/restaurant/name/:name/Id/:Id/location/:location', findRestaurantByNameAndID);

}