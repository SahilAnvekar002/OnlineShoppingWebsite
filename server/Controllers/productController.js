const productModel = require("../Models/ProductModel")

const addProduct = async(req, res) =>{
    try {
        
        const {category, description, rating, marketPrice, discountPrice, image} = req.body

        if(!category || !description || !rating || !marketPrice || !discountPrice || !image){
            return res.status(400).json("All the fields are required")
        }        

        const product = new productModel({category:category, description:description, rating:rating, marketPrice:marketPrice, discountPrice:discountPrice, image:image})
        await product.save()
        return res.status(200).json(product)

    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}

const updateProduct = async(req, res) =>{
    try {
        
        const {category, description, rating, marketPrice, discountPrice, image} = req.body
        const productId = req.params.productId

        if(!category || !description || !rating || !marketPrice || !discountPrice){
            return res.status(400).json("All the fields are required")
        }        

        const product = await productModel.findById(productId)
        if(!product){
            return res.status(400).json("Product does not found")
        }

        if(image){
            await product.updateOne({category: category, description: description, rating: rating, marketPrice: marketPrice, discountPrice: discountPrice, image: image})
        }
        else{
            await product.updateOne({category: category, description: description, rating: rating, marketPrice: marketPrice, discountPrice: discountPrice})
        }
        
        const updatedProduct = await productModel.findById(productId)
        return res.status(200).json(updatedProduct)

    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}

const deleteProduct = async(req, res) =>{
    try {
        
        const productId = req.params.productId      

        const product = await productModel.findById(productId)
        if(!product){
            return res.status(400).json("Product does not found")
        }
        
        await product.deleteOne({_id:product._id})
        return res.status(200).json("Product deleted successfully")

    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}

const fetchAllProducts = async(req, res) =>{
    try {
        
        const products = await productModel.find()
        return res.status(200).json(products)

    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}

const fetchProduct = async(req, res) =>{
    try {
        const id = req.params.productId
        const product = await productModel.findById(id)

        if(!product){
            return res.status(400).json("Product does not found")
        }

        return res.status(200).json(product)

    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}


module.exports = {addProduct, updateProduct, deleteProduct, fetchAllProducts, fetchProduct}