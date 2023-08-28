const productRoute = require("express").Router();
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticated, authtorizeRoles } = require("../middleware/auth");

productRoute.route("/products").get(isAuthenticated, authtorizeRoles("admin"), getAllProducts);
productRoute.route("/product/new").post(isAuthenticated, createProduct);
productRoute
    .route("/product/:id")
    .put(isAuthenticated, updateProduct)
    .delete(isAuthenticated, deleteProduct)
    .get(getProductDetails);

module.exports = productRoute;