const Blogs = require('../../model/blogs.model');

// API: GET /blog/:slug
// module.exports.getBlogById = async (req, res) => {
//     try {
//         const { slug } = req.params;

//         const blog = await Blogs.findOne({
//             slug: slug,
//             status: 'active',
//             deleted: false
//         }).lean();

//         if (!blog) {
//             return res.status(404).json({ message: 'Blog không tồn tại hoặc đã bị xóa' });
//         }

//         await Blogs.findOneAndUpdate({ slug: slug }, { $inc: { viewCount: 1 } });

//         res.status(200).json({
//             message: 'Lấy thông tin blog thành công',
//             blog,
//         });
//     } catch (error) {
//         console.error('Lỗi khi lấy blog:', error);
//         res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau' });
//     }
// };

// module.exports.getBlogById = async (req, res) => {
//     try {
//         const { identifier } = req.params;

//         const baseQuery = {
//             status: 'active',
//             deleted: false
//         };

//         if (mongoose.Types.ObjectId.isValid(identifier)) {
//             baseQuery._id = identifier;
//         } else {
//             baseQuery.slug = identifier;
//         }

//         const blog = await Blogs.findOneAndUpdate(
//             baseQuery,
//             { $inc: { viewCount: 1 } },
//             { new: true }
//         ).lean();

//         if (!blog) {
//             return res.status(404).json({ message: 'Blog không tồn tại hoặc đã bị xóa' });
//         }

//         res.status(200).json({
//             message: 'Lấy thông tin blog thành công',
//             blog,
//         });

//     } catch (error) {
//         console.error('Lỗi khi lấy blog:', error);
//         res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau' });
//     }
// };

// API: GET /blog
module.exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blogs.find().lean();

        if (!blogs || blogs.length === 0) {
            return res.status(404).json({ message: 'Không có blog nào' });
        }

        res.status(200).json({
            message: 'Lấy danh sách blog thành công',
            blogs,
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách blog:', error);
        res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau' });
    }
}
