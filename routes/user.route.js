const express = require('express')

const User = require('../controllers/user.controller')

const router = express.Router()

router.post('/registerUser', User.registerUser)

router.post('/verifyLogin', User.verifyLogin)

module.exports = router
