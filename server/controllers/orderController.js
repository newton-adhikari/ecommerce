const Order           = require("../models/orderModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler    = require("../utils/errorHandler");

exports.createOrder = catchAsyncError(async(req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(200).json({
        status: true,
        order
    })
})

