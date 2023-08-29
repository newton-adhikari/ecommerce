const orderRoute          = require("express").Router();
const { createOrder }     = require("../controllers/orderController");
const { isAuthenticated } = require("../middleware/auth");

orderRoute.route("/order/new").post(isAuthenticated, createOrder);

module.exports = orderRoute;