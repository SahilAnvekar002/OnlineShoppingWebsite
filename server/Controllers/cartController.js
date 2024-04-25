const cartModel = require("../Models/CartModel")

const getCart =async(req, res)=>{
    try {
        
        const userId = req.params.userId

        const cart = await cartModel.findOne({userId: userId})

        return res.status(200).json(cart)

    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}

const updateCart =async(req, res)=>{
    try {
        
        const {productId, productQuantity} = req.body
        const userId = req.params.userId

        const cart = await cartModel.findOne({userId: userId})

        const existingProductIndex = cart.productInfo.findIndex(
            (item) => item.productId === productId
        )

        if(existingProductIndex !== -1 ){
            if (productQuantity >0){
                cart.productInfo[existingProductIndex].productQty = productQuantity
                await cart.save()
            }
            else{
                await cart.updateOne({$pull: {productInfo: { productId : productId } }})
            }
        }
        else{
            await cart.updateOne({$push: {productInfo: { productId : productId, productQty: productQuantity } }})
        }

        const updatedCart = await cartModel.find({userId: userId})
        return res.status(200).json({updatedCart: updatedCart})

    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}

module.exports = {updateCart, getCart}