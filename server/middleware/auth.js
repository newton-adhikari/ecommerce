const jwt  = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");

exports.isAuthenticated = async (req, res, next) => {
    const cookie = req.cookies;

    const { token } = cookie;

    if(!token) return next(new ErrorHandler("Please login to access this resource", 401));
    
    const decoded = jwt.verify(token, process.env.SECRET);

    const user = await User.findById(decoded.id);

    if (user) {
        req.user = user;
        next();
        return;
    }

    next(new Error("Invalid token"))
}

exports.authtorizeRoles = (...roles) => {
    return async(req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new ErrorHandler("You are not authorized to view this resource"));
        }
    next();
    }
}