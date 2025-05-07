const { default: mongoose } = require("mongoose");
const Users = require('./users.model');

const BlogsSchema = new mongoose.Schema({
    title: String,
    slug: String,
    content: String,
    summary: String,
    tags: [String],
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    affiliateLinks: [
        {
            label: String,
            url: String,
            clickCount: { type: Number, default: 0 }
        }
    ],
    images: [
        {
            url: String,
            caption: String,
            public_id: String,
        }
    ],
    viewCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    deleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {
    timestamps: true
})

const Blogs = mongoose.model('Blogs', BlogsSchema, 'blogs');

module.exports = Blogs;