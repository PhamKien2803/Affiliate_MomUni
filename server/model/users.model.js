
const { default: mongoose } = require("mongoose");

const UsersSchema = new mongoose.Schema({
    role: { type: String, enum: ['admin'] },
    name: String,
    email: String,
    passwordHash: String,
    accesstoken: String,
    refreshtoken: String,
    createdAt: Date,
    updatedAt: Date
}, {
    timestamps: true
})

const Users = mongoose.model('Users', UsersSchema, 'users');

module.exports = Users;