const userModel = require('../data/models/user/user.model.server')

findAllUsers = () => userModel.find()

findUserById = (userId) => userModel.findById(userId,{password:0})

findUserByUsername = (username) => userModel.findOne({username: username},{password: 0})

findUserByCredentials = (username, password) => userModel.findOne({username: username, password: password},{password: 0})

createUser = (user) => userModel.create(user)

deleteUser = (userId) => userModel.remove({_id: userId})

updateUser = (userId, newUser) => userModel.update({_id: userId}, {$set: newUser})

addFollowing = (following, userId) => userModel.findByIdAndUpdate(userId, {$addToSet: {following: following}})

updateFollowers = (userID, followers) => userModel.findByIdAndUpdate(userID, )
addFollower = (follower, userId) => userModel.findByIdAndUpdate(userId, {$addToSet: {followers: follower}})

module.exports = {
    findUserById: findUserById,
    findAllUsers:findAllUsers,
    findUserByUsername: findUserByUsername,
    findUserByCredentials: findUserByCredentials,
    createUser: createUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
    addFollowing: addFollowing,
    addFollower: addFollower
};