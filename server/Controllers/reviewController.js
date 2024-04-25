const reviewModel = require("../Models/ReviewModel")

const addReview = async(req, res)=>{
    try {

        const {title, description, rating, userId, productId} = req.body

        if(!title || !description || !rating || !userId || !productId){
            return res.status(400).json("All fields are required")
        }

        const review = new reviewModel({title:title, description:description, rating:rating, userId:userId, productId:productId})
        await review.save()

        return res.status(200).json({review:review})
        
    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}

const updateReview = async(req, res)=>{
    try {

        const {title, description, rating} = req.body
        const reviewId = req.params.reviewId

        if(!title || !description || !rating){
            return res.status(400).json("All fields are required")
        }
        
        const review = await reviewModel.findById(reviewId)
        if(!review){
            return res.status(400).json("Review not found")
        }

        await review.updateOne({title:title, description: description, rating: rating})

        const updatedReview = await reviewModel.findById(reviewId)

        return res.status(200).json({updatedReview: updatedReview})
        
    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}

const deleteReview = async(req, res)=>{
    try {

        const reviewId = req.params.reviewId
        
        const review = await reviewModel.findById(reviewId)
        if(!review){
            return res.status(400).json("Review not found")
        }

        await review.deleteOne({_id:review._id})

        return res.status(200).json("Review deleted successfully")
        
    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}

const getProductReviews = async(req, res)=>{
    try {

        const productId = req.params.productId
        
        const reviews = await reviewModel.find({productId:productId})

        return res.status(200).json(reviews)
        
    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}

module.exports = {addReview, updateReview, deleteReview, getProductReviews}