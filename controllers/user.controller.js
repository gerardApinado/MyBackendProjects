const CryptoJS = require('crypto-js')

const User = require('../models/user.model')
const Auth = require('../middlewares/auth')

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
        const {username, password, isAdmin} = req.body

        const user = await User.findOne({username: username})

        if (!user) {
            res.status(404).send({message:"User Not Found!"})
            return
        }

        const bytes = CryptoJS.AES.decrypt(user.password,'secretpass')
        const decryptedPass = bytes.toString(CryptoJS.enc.Utf8)

        if (password === decryptedPass) {
            // login success
            // create jwt token
            const token = Auth.createToken(user)
            res.status(200).send({result:user, message:"password match", token: token})
        } else {
            res.status(200).send({result:user, message:"password incorrect"})
            // login fail
        }
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports.verifyToken = (req,res) => {
    try {
        // decode user token payload
        const userData = Auth.decodePayload(req.headers.authorization)
        
        res.status(200).json({message: "verified", payload: userData})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}