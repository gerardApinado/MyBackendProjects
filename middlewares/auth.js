const jwt = require('jsonwebtoken')

// create jwt token with userData as jwt payload
module.exports.createToken = data => {
    console.log(data)
    let userData = {
        id: data._id,
        username: data.username,
        isAdmin: data.isAdmin
    }

    return jwt.sign(userData, 'secretjwt')
}

// verify token
module.exports.verifyToken = (req, res, next) => {
    const requestToken = req.headers.authorization

    if (typeof requestToken == "undefined") {
        res.status(401).send({auth: "Token is missing"})
    } else {
        const token = requestToken.split(' ')[1]
        
        if(typeof token !== "undefined"){
            return jwt.verify(token, 'secretjwt', (err, data) => {
                if(err){
                    return res.status(401).send({auth: "Authentication Failed!"})
                } else {
                    next()
                }
            })
        }
    }
}

module.exports.decodePayload = (bearerToken) => {
    const token = bearerToken.split(' ')[1]

    return jwt.decode(token)
}