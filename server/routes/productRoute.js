const productRoute = require("express").Router();
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");

productRoute.route("/products").get(getAllProducts);
productRoute.route("/product/new").post(createProduct);
productRoute.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);

module.exports = productRoute;