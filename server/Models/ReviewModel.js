const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    title :{
        type :String,
    },
    description: {
        type: String,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    userId: {
        type :String
    },
    productId: {
        type :String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const reviewModel = mongoose.model('review', reviewSchema);
module.exports = reviewModel