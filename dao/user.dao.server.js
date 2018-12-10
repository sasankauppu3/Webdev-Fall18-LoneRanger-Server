const userModel = require('../data/models/user/user.model.server')

findAllUsers = () => userModel.find()

findUserById = (userId) => userModel.findById(userId,{password:0})

findUserByUsername = (username) => userModel.findOne({username: username},{password: 0})

findUserByCredentials = (username, password) => userModel.findOne({username: username, password: password},{password: 0})

createUser = (user) => userModel.create(user)

deleteUser = (userId) => userModel.remove({_id: userId})

updateUser = (userId, newUser) => userModel.update({_id: userId}, {$set: newUser})

setUserRole = (userId, role) => userModel.findByIdAndUpdate(userId, {$set: {role: role}})

approveRequest = (userId) => userModel.findByIdAndUpdate(userId, {$set: {role: 'influencer', approvedFlag: true}})

addFollowing = (followingId, userId) => userModel.findByIdAndUpdate(userId, {$addToSet: {following: followingId}})

updateFollowers = (userID, followers) => userModel.findByIdAndUpdate(userID, )

addFollower = (followerId, userId) => userModel.findByIdAndUpdate(userId, {$addToSet: {followers: followerId}})

getFollowingForUser = (following) => userModel.find({_id: {$in: following}})

removeFollower = (userId, followerId) => userModel.update(
    {_id: userId },
    { $pull: { followers: followerId } },
);

removeFollowing = (userId, followingId) => userModel.update(
    {_id: userId },
    { $pull: { following: followingId } },
);

module.exports = {
    findUserById: findUserById,
    findAllUsers:findAllUsers,
    findUserByUsername: findUserByUsername,
    findUserByCredentials: findUserByCredentials,
    createUser: createUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
    addFollowing: addFollowing,
    addFollower: addFollower,
    setUserRole: setUserRole,
    approveRequest: approveRequest,
    getFollowingForUser: getFollowingForUser,
    removeFollower: removeFollower,
    removeFollowing: removeFollowing
};