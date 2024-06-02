const Product = require('../models/product.model')


module.exports.createProduct = async (reqBody) => {
    // .create() to create data from body
    const product = await Product.create(reqBody).then((result, err) => result ? result : err)

    return product
}

module.exports.getAllProducts = async () => {
    // .find to find all data
    const allProducts = await Product.find({}).then((result) => result)

    return allProducts
}

module.exports.getProductByID = async (id) => {
    // .find to find all data
    const productById = await Product.findById(id).then((result) => result )

    return productById
}

// code camp verison controller
module.exports.updateProductByID = async (req,res) => {
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
}

module.exports.deleteProductByID = async (req, res) => {
    try {
        const deleteByID = await Product.findByIdAndDelete(req.params.id)
        if (!deleteByID){
            res.status(404).json({message: "Product not found."})
        }

        res.status(200).json({message: `Product with ID:${req.params.id} deleted`})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}