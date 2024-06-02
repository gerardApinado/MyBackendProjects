const express = require('express')
const mongoose = require('mongoose')

const Product = require('./models/product.model')

const app = express()

// middleware for json payload
app.use(express.json())


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

// API HTTP Requests
app.get('/', (req,res) => {
    res.send("Hello from node API Server")
})

app.post('/api/addProduct', async (req,res) => {
    try {
        // .create() to create data from body
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/api/getProducts', async (req,res) => {
    try {
        // .find to find all data
        const allProducts = await Product.find({})
        res.status(200).json(allProducts)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

