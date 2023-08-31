const Order           = require("../models/orderModel");
const Product         = require("../models/productModel");
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
});

exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) return next(new ErrorHandler`No order found with id:${req.params.id}`, 404);

    res.status(200).json({
        success: true,
        order
    })
})

exports.myOrders = catchAsyncError(async (req, res, next) => {
    const order = await Order.find({user: req.user._id}).populate("user", "name email");

    res.status(200).json({
        success: true,
        order
    })
})

exports.getAllOrders = catchAsyncError(async(req, res, next) => {
    const orders = await Order.find({});

    let total = 0;
    orders.forEach(o => total += o.totalPrice);

    res.status(200).json({
        success: true,
        totalPrice: total,
        orders
    })
})

exports.updateOrder = catchAsyncError(async(req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order) return next(new ErrorHandler("This order cannot be found"), 404);

    // check if the order is already delivered
    if(order.orderStatus === "Delivered") return next(new ErrorHandler("This order has already been delivered"), 500);

    // update the order stock after delevery
    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity); // is there this amount of quantity in the stock
    })

    order.orderStatus = req.body.status // change the order status

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false});

    res.status(200).json({
        success: true,
        order
    })
})

const updateStock = async (prod, quantity) => {
    const product = await Product.findById(prod);

    product.Stock -= quantity;

    await product.save({ validateBeforeSave: false });
}

exports.deleteOrder = catchAsyncError(async(req, res, next) => {
    const order = await Order.findById(req.param.id);

    if(!order) return next(new ErrorHandler("This order cannot be found"), 404);

    await Order.deleteOne({_id: req.params.id});

    res.status(200).json({
        success: true,
        message: "Order deleted successfully"
    })
});