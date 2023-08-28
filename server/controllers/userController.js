const ErrorHandler    = require("../utils/errorHandler");
const User            = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const { sendToken }   = require("../utils/jwtToken");
const { sendEmail }   = require("../utils/sendEmail");
const crypto          = require("crypto");

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

exports.forgotPassword = catchAsyncError(async(req, res, next) => {
    const email = req.body.email;

    const user = await User.findOne({email});

    if(!user) return next(new ErrorHandler("User not found", 500));

    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    const passwordResetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset url is \n\n${passwordResetUrl}. \n\n If you haven't requested this email please ignore it`;

    console.log(passwordResetUrl);
    try {
        await sendEmail({
            email,
            message,
            subject: "Ecommerce password recovery"
        });

        res.status(200).json({
            success: true,
            message: "Email sent successfully"
        })

    } catch(err) {
        user.resetPasswordToken  = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        return next(new ErrorHandler(err.message))
    }

})

exports.resetPassword = async(req, res, next) => {

    const token = req.params.token;

    const hash = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({resetPasswordToken: hash, resetPasswordExpire: {$gt: Date.now()}});

    if(!user) return next(new ErrorHandler("Token Expired", 500));

    if(req.body.password !== req.body.confirmPassword) return next(new ErrorHandler("Password and conifrm password must match", 400))

    user.password = req.body.password;
    user.resetPasswordToken  = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message: "password changed successfully"
    })
}