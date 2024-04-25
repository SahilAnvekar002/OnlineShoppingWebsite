const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username :{
        type: String,
        unique : true,
        minLength : 5,
        maxLength: 30
    },
    email: {
        type: String,
        unique : true,
        minLength : 5
    },
    password: {
        type: String,
        minLength: 8
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const userModel = mongoose.model('user', userSchema);
module.exports = userModel