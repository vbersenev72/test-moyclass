const Router = require('express')
const router = new Router()
const LessonsController = require('../controllers/lessons.controller')



router.post('/lessons', LessonsController.create)



module.exports = router