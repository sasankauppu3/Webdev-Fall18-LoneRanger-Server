const userDao = require('../dao/user.dao.server');

module.exports = function (app) {
    var session = require('express-session');
    app.use(session({
        resave: false,
        saveUninitialized: true,
        duration: 30 * 60 * 1000,
        activeDuration: 30 * 60 * 1000,
        secret: 'secret'
    }));


    findAllUsers = (req, res) => userDao.findAllUsers()
        .then(function (user) {res.send(user)})

    findUserById = (req, res) => {
        var userId = req.params['userId']
        userDao.findUserById(userId)
            .then(function (user) {res.json(user)})}

    login = (req, res) => {
        var user = req.body
        var username = user.username
        var password = user.password
        userDao.findUserByCredentials(username, password)
            .then((u) => {
                if (u != null) {
                    req.session['user'] = u
                    res.json({status: 'success', role: u.role})
                } else {
                    res.json({status: 'user does not exists', role: null})
                }
            })}

    register = (req, res) => {
        var user = req.body
        var username = user.username
        userDao.findUserByUsername(username).then(function (u) {
            if (u != null) {
                res.json({status: false})
            } else {
                userDao.createUser(user).then(function (user) {
                    user.password = ''
                    req.session['user'] = user
                    res.json({status: true})})}
        })}

    getProfile = (req, res) => {
        if (req.session && req.session['user']) {
            userDao.findUserById(req.session['user']._id).then((user) =>
                res.json(user))}
        else {
            res.send(null)}
    }


    updateProfile = (req, res) => {
        if (req.session && req.session['user']) {
            var user = req.session['user']
            var id = user._id
            var newUser = req.body
            userDao.updateUser(id, newUser).then(
                function (status) {
                    newUser['_id'] = id
                    req.session['user'] = newUser
                    res.send(status)
                })}
        else {res.send(null)}
    }

    addFollowing = (req, res) => {
        var followingId = req.params['Id']
        var userId = req.params['userId']
        userDao.addFollowing(followingId, userId).then(
            function (status) {
                res.send(status)
            }).catch(e => {
            res.send(e);
        });};

    addFollower = (req, res) => {
        var followerId = req.params['Id']
        var userId = req.params['userId']
        console.log(followerId, userId)
        userDao.addFollower(followerId, userId).then(
            function (status) {
                res.send(status)
            }).catch(e => {
            res.send(e);
        });};

    logout = (req, res) => {
        if (req.session && req.session['user']) {
            req.session.destroy()
            res.send('logged-out')}
        else {
            res.send('no-session-exists')}
    }

    deleteUser = (req, res) => {
        if (req.session && req.session['user'] && req.session['user'].role === 'Admin') {
            var id = req.params['userId']
            userDao.deleteUser(id).then(function (status) {
                res.send(status)
            })}
        else {
            res.json({status: 'no-session-exists'})}
    }

    getPublicProfile = (req, res) => {
        var userId = req.params['pid']
        userDao.findUserById(userId)
            .then(function (user) {res.json(user)})}





    //USER REST API CALLS
    app.get('/api/user', findAllUsers);
    app.get('/api/user/:userId', findUserById);
    app.delete('/api/user/:userId', deleteUser);
    app.post('/api/login', login);
    app.post('/api/register', register);
    app.get('/api/profile/:pid', getPublicProfile);

    app.get('/api/profile', getProfile);
    app.post('/api/logout', logout);
    app.put('/api/profile', updateProfile);
    app.put('/api/addFollowing/user/:userId/following/:Id', addFollowing);
    app.put('/api/addFollower/user/:userId/follower/:Id', addFollower);
}