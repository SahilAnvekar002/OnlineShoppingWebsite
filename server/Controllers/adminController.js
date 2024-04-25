const AdminModel = require('../Models/AdminModel')

const adminLogin = async(req, res) =>{
    try {
        
        const {username, password} = req.body

        if(!username || !password){
            return res.status(400).json("Invalid credentials")
        }

        admin = await AdminModel.findOne({username: username})
        if(!admin){
            return res.status(400).json("Invalid credentials")
        }

        if(password !== admin.password){
            return res.status(400).json("Invalid credentials")
        }

        return res.status(200).json({admin: admin})

    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}

module.exports = {adminLogin}