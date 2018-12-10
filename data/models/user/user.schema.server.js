var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    approvedFlag: Boolean,
    role:{type:String, enum:['influencer','generic','admin']},
    followers: [],
    following: []
}, {collection: 'User'});

module.exports = userSchema;