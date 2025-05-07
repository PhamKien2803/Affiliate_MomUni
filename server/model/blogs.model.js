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
    media: [
        {
            type: { type: String, enum: ['image', 'video'] },
            url: String,
            caption: String
        }
    ],
    viewCount: { type: Number, default: 0 },
    clickCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Blogs = mongoose.model('Blogs', BlogsSchema, 'blogs');

module.exports = Blogs;