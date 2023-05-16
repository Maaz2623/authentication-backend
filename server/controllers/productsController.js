import Product from '../models/Product.js'

export const createProduct = async (req, res) => {
    const {productName, productPrice} = req.body
    try {
        const product = new Product({productName, productPrice})
        const savedProduct = await product.save()
        res.status(200).json({message: "Product Added", savedProduct})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params
    try {
        const product = await Product.findByIdAndDelete(id)
        res.status(200).json({message: "Product deleted", product})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}