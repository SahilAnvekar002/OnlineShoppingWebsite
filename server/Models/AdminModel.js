const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    username :{
        type: String,
        unique : true,
    },
    password: {
        type: String
    }
})

const adminModel = mongoose.model('admin', adminSchema);
module.exports = adminModel