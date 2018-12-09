const reviewModel = require('../data/models/reviews/reviews.model.server')

findAllReview = () => reviewModel.find()

findReviewById = (reviewId) => reviewModel.findById(reviewId)

findReviewByUsernameForRestaurant = (username, restId) => reviewModel.find({username: username, restaurantID: restId})

findAllReviewsForUser = (username) => reviewModel.find({username: username})

findAllReviewsForRestaurant = (restId) => reviewModel.find({restaurantID: restId})

createReview = (review) => reviewModel.create(review)

deleteReview = (reviewId) => reviewModel.remove({_id: reviewId})

updateReview = (reviewId, review) => reviewModel.update({_id: reviewId}, {$set: review})

module.exports = {
    createReview: createReview,
    findAllReview: findAllReview,
    findReviewById: findReviewById,
    findAllReviewsForRestaurant: findAllReviewsForRestaurant,
    findReviewByUsernameForRestaurant: findReviewByUsernameForRestaurant,
    findAllReviewsForUser: findAllReviewsForUser,
    deleteReview: deleteReview
};