const express = require('express')

const Product = require('../models/product.model')

const router = express.Router()

// API HTTP Requests
router.post('/createProduct', async (req,res) => {
    try {
        // .create() to create data from body
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// find all
router.get('/getProducts', async (req,res) => {
    try {
        // .find to find all data
        const allProducts = await Product.find({})
        res.status(200).json(allProducts)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// find by ID
router.get('/getProduct/:id', async (req,res) => {
    try {
        // .find to find all data
        const productById = await Product.findById(req.params.id)
        res.status(200).json(productById)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// update
router.put('/updateProduct/:id', async (req, res) => {
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
router.delete('/deleteProduct/:id', async (req, res) => {
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

module.exports = router