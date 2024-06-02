const express = require('express')
const mongoose = require('mongoose')

// Import Route Modules
const productRoutes = require('./routes/product.route')

const app = express()

// middleware
app.use(express.json()) // json payload
app.use(express.urlencoded({extended: false})) // form-data payload


// mongoDB
// connect to DB Server
mongoose.connect('mongodb+srv://admin:admin123456@mysampledb.fzsucck.mongodb.net/?retryWrites=true&w=majority&appName=MySampleDB')
.then(() => {
    console.log("DB connected!")
    // localhost:3000
    app.listen(3000, () => {
        console.log("Server Running on Port: 3000")
    })
})
.catch(() => console.log("DB connection failed!"))

// Sample HTTP Get Method
app.get('/', (req,res) => {
    res.send("Hello from node API Server. Testing Testing")
})

// Use Route Modules
app.use(`/api/products`,productRoutes)




