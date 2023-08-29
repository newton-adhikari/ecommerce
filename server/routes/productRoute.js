const productRoute = require("express").Router();
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteProductReview } = require("../controllers/productController");
const { isAuthenticated, authtorizeRoles } = require("../middleware/auth");

productRoute.route("/products").get(isAuthenticated, getAllProducts);
productRoute.route("/product/new").post(isAuthenticated, createProduct);
productRoute
    .route("/product/:id")
    .put(isAuthenticated, updateProduct)
    .delete(isAuthenticated, deleteProduct)
    .get(getProductDetails);

productRoute.route("/product/review").put(isAuthenticated, createProductReview);
productRoute.route("/reviews").get(getProductReviews).delete(isAuthenticated, deleteProductReview);

module.exports = productRoute;