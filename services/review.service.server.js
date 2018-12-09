const reviewDao = require('../dao/review.dao.server');

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


    createReviews = (req, res) => {
        var review = req.body;
        reviewDao.createReview(review).then(function (review) {
            res.json({status: true})
        }).catch(e => {
            res.send(e);
        });
    }

    findAllReviews = (req, res) => {
        reviewDao.findAllReview().then(function (reviews) {
            res.send(reviews)
        }).catch(e => {
            res.send(e);
        });

    }

    findReviewById = (req, res) => {
        reviewID = req.params['Id'];
        reviewDao.findReviewById(reviewID).then(function (review) {
            res.send(review)
        }).catch(e => {
            res.send(e);
        });

    }

    findAllReviewsForRestaurant = (req, res) => {
        restID = req.params['Id'];
        reviewDao.findAllReviewsForRestaurant(restID).then(function (review) {
            res.send(review)
        }).catch(e => {
            res.send(e);
        });

    }

    findReviewByUsernameForRestaurant = (req, res) => {
        restID = req.params['Id'];
        username = req.params['username'];
        reviewDao.findReviewByUsernameForRestaurant(username, restID).then(function (review) {
            res.send(review)
        }).catch(e => {
            res.send(e);
        });
    }

    findAllReviewsForUser = (req, res) => {
        username = req.params['username'];
        reviewDao.findAllReviewsForUser(username).then(function (reviews) {
            res.send(reviews)
        }).catch(e => {
            res.send(e);
        });
    }

    deleteReview = (req, res) => {
        reviewId = req.params['Id'];
        console.log(reviewId)
        reviewDao.deleteReview(reviewId).then(function (reviews) {
            res.send(reviews)
        }).catch(e => {
            res.send(e);
        });
    }
    //USER REST API CALLS
    app.post('/api/reviews/create', createReviews);
    app.get('/api/reviews/', findAllReviews);
    app.get('/api/reviews/restaurantId/:Id', findAllReviewsForRestaurant);
    app.get('/api/reviews/review/:Id', findReviewById);
    app.get('/api/reviews/username/:username/restaurant/:Id', findReviewByUsernameForRestaurant);
    app.get('/api/reviews/username/:username', findAllReviewsForUser);
    app.delete('/api/reviews/review/:Id', deleteReview);
    // app.get('/api/restaurant/name/:name/Id/:Id/location/:location', findRestaurantByNameAndID);
    // app.get('/api/restaurant/name/:name/Id/:id/lat/:lat/long/:long', findRestaurantByIdAndLocation);

}