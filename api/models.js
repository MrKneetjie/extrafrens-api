const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    thumb: String,
    role: String,
});

const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    banner: String,
    userId: String,
    views: Number,
    comments: Number,
});


const Account = mongoose.model('Account', accountSchema);
const Post = mongoose.model('Post', postSchema);

module.exports = { Account, Post };