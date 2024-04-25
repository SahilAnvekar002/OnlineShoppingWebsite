const express = require('express')
const { updateCart, getCart } = require('../Controllers/cartController')

const router = express.Router()

router.get('/getcart/:userId', getCart)
router.post('/update/:userId', updateCart)

module.exports = router