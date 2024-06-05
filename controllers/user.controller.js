const CryptoJS = require('crypto-js')

const User = require('../models/user.model')

module.exports.registerUser = async (req, res) => {
    try {
        const {username, password} = req.body

        // check if username already taken
        const isTaken = await User.findOne({username:username})
        if (isTaken) {
            res.status(201).json({message: "Username Already taken"})
            return
        }

        const user = {
            username: username,
            password: CryptoJS.AES.encrypt(password, 'secretpass').toString()
        }

        await User.create(user)
        res.status(201).json({message:`User Successfully Registered`})

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports.verifyLogin = async (req,res) => {
    try {
        const {username, password} = req.body

        const user = await User.findOne({username: username})

        if (!user) {
            res.status(404).send({message:"User Not Found!"})
            return
        }

        const bytes = CryptoJS.AES.decrypt(user.password,'secretpass')
        const decryptedPass = bytes.toString(CryptoJS.enc.Utf8)

        if (password === decryptedPass) {
            res.status(200).send({result:user, message:"password match"})
        } else {
            res.status(200).send({result:user, message:"password incorrect"})
        }
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}