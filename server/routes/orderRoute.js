const orderRoute          = require("express").Router();
const { createOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder }     = require("../controllers/orderController");
const { isAuthenticated, authtorizeRoles } = require("../middleware/auth");

orderRoute.route("/order/new").post(isAuthenticated, createOrder);
orderRoute.route("/order/:id").get(isAuthenticated, getSingleOrder);
orderRoute.route("/orders/me").get(isAuthenticated, myOrders);
orderRoute.route("/admin/orders").get(isAuthenticated, authtorizeRoles("admin"), getAllOrders);
orderRoute.route("/admin/order/:id").put(isAuthenticated, authtorizeRoles("admin"), updateOrder).delete(isAuthenticated, authtorizeRoles("admin"), deleteOrder);

module.exports = orderRoute;