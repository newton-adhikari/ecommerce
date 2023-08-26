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
    
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}