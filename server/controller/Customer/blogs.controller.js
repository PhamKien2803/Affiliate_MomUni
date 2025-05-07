const mongoose = require('mongoose');
const Blogs = require('../../model/blogs.model');

module.exports.getBlogById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID blog không hợp lệ' });
        }

        const blog = await Blogs.findOne({
            _id: id,
            status: 'active',
            deleted: false
        }).lean();

        if (!blog) {
            return res.status(404).json({ message: 'Blog không tồn tại hoặc đã bị xóa' });
        }

        await Blogs.findByIdAndUpdate(id, { $inc: { viewCount: 1 } });

        res.status(200).json({
            message: 'Lấy thông tin blog thành công',
            blog,
        });
    } catch (error) {
        console.error('Lỗi khi lấy blog:', error);
        res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau' });
    }
};

module.exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blogs.find({
            status: 'active',
            deleted: false
        }).lean();

        if (!blogs || blogs.length === 0) {
            return res.status(404).json({ message: 'Không có blog nào' });
        }

        res.status(200).json({
            message: 'Lấy tất cả blog thành công',
            blogs,
        });
    } catch (error) {
        console.error('Lỗi khi lấy tất cả blog:', error);
        res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau' });
    }
};