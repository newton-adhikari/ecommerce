const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    // handling the generic error
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // handling the mongodb error
    if (err.name === "CastError") {
        err.message    = "Invalid resource ID: ",  err.path;
        err.statusCode = 400;
    }

    // duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;

        err = new ErrorHandler(message, 400);
    }

    // Jwt error
    if (err.name === "JsonWebTokenError") {
        const message = "Invalid Token";

        err = new ErrorHandler(message, 401);
    }

    // Jwt expired
    if (err.name === "TokenExpiredError") {
        const message = "Token Expired";

        err = new ErrorHandler(message, 400);
    }
    
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}