const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId :{
        type :String
    },
    productInfo: [{
            productId: String,
            productQty: Number
    }],
    date: {
        type: Date,
        default: Date.now
    }
})

const cartModel = mongoose.model('cart', cartSchema);
module.exports = cartModel