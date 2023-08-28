const userRoute = require("express").Router();
const { registerUser, userLogin, userLogout, forgotPassword, resetPassword } = require("../controllers/userController");

userRoute.route("/create").post(registerUser);
userRoute.route("/login").post(userLogin);
userRoute.route("/logout").get(userLogout);
userRoute.route("/password/forgot").post(forgotPassword);
userRoute.route("/password/reset/:token").put(resetPassword);

module.exports = userRoute;