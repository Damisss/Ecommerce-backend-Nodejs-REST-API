const {Router} = require('express')
const controllerUser = require('../../controllers/user')
const {localAuth} = require('../../service/authentication')
const router = new Router()

router.post('/signup', controllerUser.signup )
router.post('/login', localAuth, controllerUser.login)

module.exports = router 