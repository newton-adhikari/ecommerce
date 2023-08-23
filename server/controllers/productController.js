const mongoose = require("mongoose");
const Product = require("../models/productModel");

exports.createProduct = async (req, res, next) => {

    const product = await Product.create(req.body);

    res.status(201).json({success: true, product})
}

exports.getAllProducts = async (req, res) => {
    const products = await Product.find({});

    return res.json(products);
}

exports.getProductDetails = async (req, res, next) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(500).json({
                success: false,
                message: "Product not found"
            })
        }

        return res.status(200).json({
            success: true,
            product
        })
    }

    res.status(500).json({
        success: false,
        message: "Invalid product ID"
    }) 

}

exports.updateProduct = async (req, res) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
}

exports.deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }

    await product.deleteOne();

    return res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
}