const Analytics = require("../../model/analytics.model");
const { getClientIp } = require("../../config/ipConfig")

exports.getAnalytics = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const match = {
            $match: {
                timestamp: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            }
        };

        const group = {
            $group: {
                _id: "$action",
                totalCount: { $sum: 1 },
                totalRevenue: { $sum: "$revenue" }
            }
        };
        const analyticsData = await Analytics.aggregate([match, group]);
        res.status(200).json(analyticsData);
    } catch (error) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
}

exports.getTotalBlogs = async (req, res) => {
    try {
        const totalBlogs = await Analytics.distinct("blogId").countDocuments();
        return res.status(200).json({ totalBlogs });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching total blogs", error: error.message });
    }
};

exports.getTotalViews = async (req, res) => {
    try {
        const totalViews = await Analytics.countDocuments({ action: "view" });
        return res.status(200).json({ totalViews });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching total views", error: error.message });
    }
};

exports.getTotalVisitors = async (req, res) => {
    try {
        const totalVisitors = await Analytics.distinct("ip").countDocuments();
        return res.status(200).json({ totalVisitors });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching total visitors", error: error.message });
    }
};


exports.trackActionIp = async (req, res) => {
    try {
        const ip = getClientIp(req);
        const { blogId, action, affiliateUrl, revenue } = req.body;
        const newAnalytics = new Analytics({
            blogId,
            action,
            affiliateUrl,
            revenue,
            ip,
            userAgent: req.headers['user-agent'],
        });
        await newAnalytics.save();
        return res.status(200).json({
            message: "Action tracked successfully",
            data: newAnalytics
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error tracking action IP",
            error: error.message
        })
    }
}

exports.getTotalVisitors = async (req, res) => {
    try {
        const totalVisitors = await Analytics.distinct("ip").countDocuments();
        return res.status(200).json({
            totalVisitors
        });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching total visitors", error: error.message });
    }
};