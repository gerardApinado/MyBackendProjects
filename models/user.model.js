const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username Required"]
        },
        password: {
            type: String,
            required: [true, "Password Required"]
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", productSchema)
module.exports = User