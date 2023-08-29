const mongoose            = require("mongoose");
const Product             = require("../models/productModel");
const ErrorHandler        = require("../utils/errorHandler");
const catchAsyncError     = require("../middleware/catchAsyncError");
const ApiFeatures         = require("../utils/ApiFeatures");

exports.createProduct = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({success: true, product})
});

exports.getAllProducts = catchAsyncError(async (req, res) => {
    console.log("get all products")
    const itemsPerPage  = 5;
    const totalProducts = await Product.countDocuments();
    const apiFeatures   = new ApiFeatures(Product.find(), req.query); // can also send Product(model) here
    const products      = await apiFeatures.search().filter().pagination(itemsPerPage).query;
    return res.json({products, totalProducts});
});

exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 400));
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

});

exports.updateProduct = catchAsyncError(async (req, res) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 400));
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
});

exports.deleteProduct = catchAsyncError(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 400));
    }

    await product.deleteOne();

    return res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
});

exports.createProductReview = catchAsyncError(async(req, res, next) => {
    const { rating, comment, productId } = req.body;
    
    const product = await Product.findById(productId);

    const review = {
        user: req.user._id,
        rating: Number(rating),
        comment
    }

    const alreadyReviewd = product.reviews.find(rev => rev.user._id.toString() === req.user._id.toString())

    if(alreadyReviewd) {
        product.reviews.forEach(rev => {
            if (rev.user._id.toString() === req.user._id.toString()) {
                rev.rating = rating;
                rev.comment = comment
            }
        })
    }
    else {
        // this is a new review with new rating
        product.reviews.push(review);
        product.numberOfReviews = product.reviews.length;
    }

    // calculate the updated rating for the product
    let avg = 0;
    product.reviews.forEach(rev => avg += rev.rating);

    product.rating = avg/product.numberOfReviews;
    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
        message: "product review created successfully"
    })
})