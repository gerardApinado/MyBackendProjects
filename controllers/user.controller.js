const CryptoJS = require('crypto-js')

const User = require('../models/user.model')

module.exports.registerUser = async (req, res) => {
    try {
        const {username, password} = req.body

        // check if username already taken
        const isTaken = await User.findOne({username:username})
        if (isTaken) {
            res.status(201).json({message: "Username Already taken"})
        }

        const user = {
            username: username,
            password: CryptoJS.AES.encrypt(password, 'secretpass').toString()
        }

        await User.create(user)
        res.status(201).json(`User Successfully Registered`)

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}