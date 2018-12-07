module.exports = function () {
    const mongoose = require('mongoose');

    var connectionString = 'mongodb://127.0.0.1:27017/foodie';
    mongoose.connect(connectionString);

}