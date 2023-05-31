const Router = require('express')
const router = new Router()
const DataController = require('../controllers/data.controller')


router.post('/', DataController.getAll)



module.exports = router