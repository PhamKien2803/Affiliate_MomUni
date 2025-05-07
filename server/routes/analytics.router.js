const express = require('express');
const router = express.Router();
const AnalyticsController = require('../controller/Admin/analytics.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get("/", AnalyticsController.getAnalytics);
router.get("/total-blogs", AnalyticsController.getTotalBlogs);
router.get("/total-views", AnalyticsController.getTotalViews);
router.get("/total-visitors", AnalyticsController.getTotalVisitors);
router.post("/track-action", authMiddleware, AnalyticsController.trackActionIp);


module.exports = router;