module.exports = function () {
    const mongoose = require('mongoose');

    var connectionString = 'mongodb://root:root1234@ds229878.mlab.com:29878/heroku_07fwmpth';
    mongoose.connect(connectionString);

}