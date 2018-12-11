var mongoose = require('mongoose');
var reviewSchema = mongoose.Schema({
    username: String,
    userID: String,
    review: String,
    restaurantID: String,
    restaurantName: String,
    restaurantLat: String,
    restaurantLon: String,
    userRole: String,
    created: {type: Date, default: Date.now()}
}, {collection: 'Reviews'});

module.exports = reviewSchema;