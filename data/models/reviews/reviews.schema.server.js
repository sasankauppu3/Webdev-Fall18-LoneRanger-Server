var mongoose = require('mongoose');
var reviewSchema = mongoose.Schema({
    username: String,
    userID: String,
    review: String,
    restaurantID: String,
    restaurantName: String,
    restaurantLat: String,
    restaurantLon: String
}, {collection: 'Reviews'});

module.exports = reviewSchema;