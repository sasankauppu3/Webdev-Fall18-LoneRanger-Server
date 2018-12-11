// require express
var express = require('express')
var app = express();

// require body-parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('./data/db')()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Credentials", "true")
    next()
})


var userService = require('./services/user.service.server')
userService(app)

var restaurantService = require('./services/restaurant.service.server')
restaurantService(app)

var reviewService = require('./services/review.service.server')
reviewService(app)

var initService = require('./services/init.service.server')
initService(app)

home = (req, res) =>
    res.send("Server Home")
app.get('/', home);

app.listen(process.env.PORT || 3000);
