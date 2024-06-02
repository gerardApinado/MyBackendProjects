const express = require('express')
const mongoose = require('mongoose')

const Product = require('./models/product.model')

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

// find all
app.get('/api/getProducts', async (req,res) => {
    try {
        // .find to find all data
        const allProducts = await Product.find({})
        res.status(200).json(allProducts)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// find by ID
app.get('/api/products/:id', async (req,res) => {
    try {
        // .find to find all data
        const productById = await Product.findById(req.params.id)
        res.status(200).json(productById)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// update
app.put('/api/products/:id', async (req, res) => {
    try {
        const productUpdateById = await Product.findByIdAndUpdate(req.params.id, req.body)

        if (!productUpdateById) {
            res.status(404).json({message: "Product not found."})
        }

        const updatedProduct = await Product.findById(req.params.id)
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete
app.delete('/api/products/:id', async (req, res) => {
    try {
        const deleteByID = await Product.findByIdAndDelete(req.params.id)
        if (!deleteByID){
            res.status(404).json({message: "Product not found."})
        }

        res.status(200).json({message: `Product with ID:${req.params.id} deleted`})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
