const productRoute = require("express").Router();
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview } = require("../controllers/productController");
const { isAuthenticated, authtorizeRoles } = require("../middleware/auth");

productRoute.route("/products").get(isAuthenticated, getAllProducts);
productRoute.route("/product/new").post(isAuthenticated, createProduct);
productRoute.route("/product/review").put(isAuthenticated, createProductReview);
productRoute
    .route("/product/:id")
    .put(isAuthenticated, updateProduct)
    .delete(isAuthenticated, deleteProduct)
    .get(getProductDetails);

module.exports = productRoute;