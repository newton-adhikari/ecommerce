const userRoute = require("express").Router();
const { isAuthenticated, authtorizeRoles } = require("../middleware/auth");
const { 
    registerUser, 
    userLogin, 
    userLogout, 
    forgotPassword, 
    resetPassword, 
    getUserDetails, 
    changePassword, 
    getAllUsers, 
    getSingleUser, 
    updateUserProfile, 
    deleteUser
} = require("../controllers/userController");

userRoute.route("/create").post(registerUser);
userRoute.route("/login").post(userLogin);
userRoute.route("/logout").get(userLogout);
userRoute.route("/password/forgot").post(forgotPassword);
userRoute.route("/password/reset/:token").put(resetPassword);
userRoute.route("/update/password").put(isAuthenticated, changePassword);
userRoute.route("/me").get(isAuthenticated, getUserDetails);
userRoute.route("/admin/users").get(isAuthenticated, authtorizeRoles("admin"), getAllUsers);
userRoute
    .route("/admin/users/:id")
    .get(isAuthenticated, authtorizeRoles("admin"), getSingleUser)
    .put(isAuthenticated, authtorizeRoles("admin"), updateUserProfile)
    .delete(isAuthenticated, authtorizeRoles("admin"), deleteUser);

module.exports = userRoute;