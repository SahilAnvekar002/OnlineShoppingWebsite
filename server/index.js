const express = require('express')
const mongoose = require('mongoose')
const env = require('dotenv') 
const userRouter = require('./Routes/userRoute')
const productRouter = require('./Routes/productRoute')
const reviewRouter = require('./Routes/reviewRoute')
const cartRouter = require('./Routes/cartRoute')
const adminRouter = require('./Routes/adminRoute')
const cors = require('cors')

env.config()

const app = express()
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}))
app.use(cors())

const port = process.env.PORT
const mongo_uri = process.env.MONGO_URI

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/review', reviewRouter)
app.use('/api/cart', cartRouter)
app.use('/api/admin', adminRouter)

app.listen(port, (req, res)=>{
    console.log("Server listening on port", port)
})

mongoose.connect(mongo_uri).then(()=>{
    console.log("Connected to mongodb successfully")
}).catch((err)=>{
    console.log("Connection to mongodb failed",err.message)
})