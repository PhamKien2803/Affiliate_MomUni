const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const usersController = require("../controller/Auth/users.controller")

router.post("/register", usersController.registerAccount);
router.post("/login", usersController.loginAccount);
router.post("/logout",  usersController.logOutAccount);
router.post("/forgot-password", usersController.forgotPassword);
router.get("/admin-profile", [authMiddleware], usersController.getAdminProfile);
router.put("/change-password", [authMiddleware], usersController.changePassword);
router.post("/verify-otp", usersController.verifyOTP)
router.put("/reset-password", usersController.resetPassword)
router.post("/refresh-token", usersController.refreshToken);

module.exports = router;