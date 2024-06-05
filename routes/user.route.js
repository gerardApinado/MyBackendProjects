const express = require('express')

const User = require('../controllers/user.controller')
const Auth = require('../middlewares/auth')

const router = express.Router()

router.post('/registerUser', User.registerUser)

router.post('/verifyLogin', User.verifyLogin)

router.post('/verifyToken',Auth.verifyToken, User.verifyToken)

module.exports = router
