const express      = require("express");
const app          = express();
const productRoute = require("./routes/productRoute");
const errorHandler = require("./middleware/error");

// routes
app.use(express.json());
app.use("/api/v1", productRoute);

// error handler
app.use(errorHandler);

module.exports = app;