const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    category: {
        type: String,
    },
    description: {
        type: String,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    marketPrice: {
        type: Number,
    },
    discountPrice: {
        type: Number,
    },
    image: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const productModel = mongoose.model('product', productSchema);
module.exports = productModel