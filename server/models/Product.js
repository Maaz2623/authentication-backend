import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: String,
    productPrice: String
})

export default mongoose.model('Product', productSchema)