const express = require('express');
const router = express.Router();
const notificationController = require("../controller/Admin/notification.controller")
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", [authMiddleware], notificationController.getNotifications);
router.patch("/read/:id", [authMiddleware], notificationController.markAsRead);
router.delete("/:id", [authMiddleware], notificationController.deleteNotification);

module.exports = router;