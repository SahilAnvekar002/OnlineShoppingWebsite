const express = require('express')
const { addReview, updateReview, deleteReview, getProductReviews } = require('../Controllers/reviewController')

const router = express.Router()

router.post('/add', addReview)
router.post('/update/:reviewId', updateReview)
router.delete('/delete/:reviewId', deleteReview)
router.get('/getproductreviews/:productId', getProductReviews)

module.exports = router

