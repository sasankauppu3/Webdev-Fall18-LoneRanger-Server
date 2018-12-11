const initDao = require('../dao/init.dao.server')()

module.exports = app => {

    populate = (req, res) =>
        initDao.initDatabase().then(result=> res.send("DB initialized"))

    app.post('/api/init', populate)
}