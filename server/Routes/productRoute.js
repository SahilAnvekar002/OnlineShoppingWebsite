const express = require('express')
const { addProduct, updateProduct, deleteProduct, fetchAllProducts, getProducts, fetchProduct } = require('../Controllers/productController')

const router = express.Router()

router.post('/add', addProduct)
router.post('/update/:productId', updateProduct)
router.delete('/delete/:productId', deleteProduct)
router.get('/getallproducts', fetchAllProducts)
router.get('/getproduct/:productId', fetchProduct)

module.exports = router