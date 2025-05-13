const slugify = require("slugify");
const Blogs = require("../../model/blogs.model");
const Analytics = require("../../model/analytics.model")

module.exports.createBlog = async (req, res) => {
    try {
        const { title, content, authorId } = req.body;
        if (!title || !content || !authorId) {
            return res.status(400).json({ message: 'Missing required fields: title, content, authorId' });
        }
        req.body.slug = slugify(title, { lower: true, strict: true });
        const newBlog = new Blogs(req.body);
        await newBlog.save();
        const newAnalytics = new Analytics({
            blogId: newBlog._id,
            action: "create",
            affiliateUrl: null,
            revenue: 0,
            ip: req.ip,
            userAgent: req.headers['user-agent'],
            timestamp: new Date()
        })
        await newAnalytics.save();
        res.json({
            code: 201,
            message: "Create Blog Successfully"
        })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error })
    }
}

module.exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        await Blogs.findByIdAndUpdate(id, {
            status: true
        });
        const deleteAnalyticsBlog = await Analytics.deleteMany({blogId: id});
        if (!deleteAnalyticsBlog) {
            return res.status(404).json({
                message: "Analytics not found"
            })
        }
        if (!deleteAnalyticsBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        await Blogs.findByIdAndDelete(id);
        res.status(200).json({
            code: 200,
            message: 'Blog deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

module.exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            content,
            summary,
            tags,
            affiliateLinks,
            media
        } = req.body;

        const blog = await Blogs.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (title) {
            blog.title = title;
            blog.slug = slugify(title, { lower: true, strict: true }); // cập nhật slug nếu đổi tiêu đề
        }

        if (content !== undefined) blog.content = content;
        if (summary !== undefined) blog.summary = summary;
        if (tags !== undefined) blog.tags = tags;
        if (affiliateLinks !== undefined) blog.affiliateLinks = affiliateLinks;
        if (media !== undefined) blog.media = media;

        await blog.save();

        res.status(200).json({
            code: 200,
            message: "Update Blogs Successfully"
        });
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

module.exports.getBlog = async (req, res) => {
    try {
        const blogs = await Blogs.find({})
        res.json({
            code: 200,
            blogs,
            message: "Get All Blog Successfully"
        })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}