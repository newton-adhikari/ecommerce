const ErrorHandler    = require("../utils/errorHandler");
const User            = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const { sendToken }   = require("../utils/jwtToken");

exports.registerUser  = catchAsyncError(async(req, res, next) => {
    const { name, email, password } = req.body;
    const avatar                    = {
        public_id: "this is a sample id",
        url      : "this is a sample url"
    };

    const user = await User.create({name, email, password, avatar});
    sendToken(user, 201, res);
});

exports.userLogin = catchAsyncError(async(req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) return next(new ErrorHandler("Email or Password missing", 401));

    const user = await User.findOne({email}).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 401));

    const correctPassword = await user.checkPassword(password);

    if (!correctPassword) return next(new ErrorHandler("Invalid Email or Password", 401));

    sendToken(user, 200, res);
});

exports.userLogout = catchAsyncError(async(req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Successfully logged out"
    })
});