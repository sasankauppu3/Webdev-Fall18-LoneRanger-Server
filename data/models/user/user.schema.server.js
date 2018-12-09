var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    role:{type:String, enum:['influencer','generic']},
    followers: [],
    following: []
}, {collection: 'User'});

module.exports = userSchema;