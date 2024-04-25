const express = require('express')
const { signup, login, getUser } = require('../Controllers/userController')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/getuser/:userId', getUser)

module.exports = router

