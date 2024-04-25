const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const env = require('dotenv')
const validator = require('validator')
const userModel = require('../Models/UserModel')
const cartModel = require('../Models/CartModel')

env.config()

const signup = async(req, res) =>{
    try {
        
        const {username, email, password} = req.body

        if(!username || !email || !password){
            return res.status(400).json("Invalid credentials")
        }

        if(!validator.isEmail(email)){
            return res.status(400).json("Invalid email")
        }

        if(!validator.isStrongPassword(password)){
            return res.status(400).json("Password must contain special symbols and uppercase characters")
        }

        user = await userModel.findOne({username: username})
        if(user){
            return res.status(400).json("User with this username already exists")
        }

        user = await userModel.findOne({email: email})
        if(user){
            return res.status(400).json("User with this email already exists")
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({username:username, email:email, password:hashedPassword})
        await newUser.save()

        const cart = new cartModel({userId:newUser._id})
        await cart.save()

        const jwtToken = jwt.sign({_id: newUser._id}, process.env.JWT_SECRET)

        return res.status(200).json({user: newUser, jwtToken})

    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}

const login = async(req, res) =>{
    try {
        
        const {username, password} = req.body

        if(!username || !password){
            return res.status(400).json("Invalid credentials")
        }

        user = await userModel.findOne({username: username})
        if(!user){
            return res.status(400).json("Invalid credentials")
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            return res.status(400).json("Invalid credentials")
        }

        const jwtToken = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

        return res.status(200).json({user: user, jwtToken})

    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}

const getUser = async(req, res) =>{
    try {

        user = await userModel.findById(req.params.userId)
        if(!user){
            return res.status(400).json("User not found")
        }

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}

module.exports = {signup, login, getUser}