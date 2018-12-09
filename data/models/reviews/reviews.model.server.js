var mongoose = require('mongoose');
var reviewSchema = require('./reviews.schema.server');
var reviewModel = mongoose.model('ReviewModel', reviewSchema);
module.exports = reviewModel;