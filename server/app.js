const express      = require("express");
const app          = express();
const productRoute = require("./routes/productRoute");
const userRoute    = require("./routes/userRoute");
const errorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");

// routes
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);

// error handler
app.use(errorHandler);

module.exports = app;