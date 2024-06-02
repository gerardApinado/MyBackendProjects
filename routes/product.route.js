const express = require('express')

const Product = require('../models/product.model')

const ProductController = require('../controllers/product.controller')

const router = express.Router()

// API HTTP Requests
router.post('/createProduct', async (req,res) => {
    try {
        ProductController.createProduct(req.body).then(result => res.status(201).send(result))
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// find all
router.get('/getProducts', async (req,res) => {
    try {
        ProductController.getAllProducts().then(result => res.status(200).send(result))
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// find by ID
router.get('/getProduct/:id', async (req,res) => {
    try {
        ProductController.getProductByID(req.params.id).then(result => res.status(200).send(result))
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// update - code camp version
router.put('/updateProduct/:id', ProductController.updateProductByID)

// delete
router.delete('/deleteProduct/:id', ProductController.deleteProductByID)

module.exports = router