const userDao = require('./user.dao.server')

module.exports = () => {

    initDatabase = () => {
        return userDao.createUser({
            "followers" : [ ], "following" : [ ], "username" : "admin", "password" : "admin", "email" : "admin@foodie.com", "role" : "admin", "approvedFlag" : true, "__v" : 0 })}
    return {
        initDatabase
    }
}