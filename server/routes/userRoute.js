const userRoute = require("express").Router();
const { registerUser, userLogin, userLogout } = require("../controllers/userController");

userRoute.route("/create").post(registerUser);
userRoute.route("/login").post(userLogin);
userRoute.route("/logout").get(userLogout);

module.exports = userRoute;