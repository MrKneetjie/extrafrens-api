import { Post } from "../models";
const connectDB = require('../mongoose.js');

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    return await fn(req, res)
}
  
async function handler(req, res) {
    await connectDB();
    
    if (!req.body.title || !req.body.description || !req.body.banner || !req.body.userId) {
        res.status(400).json({
            message: "Missing required fields",
        });
    } else {
        await Post.create({
            title: req.body.title,
            description: req.body.description,
            banner: req.body.banner,
            userId: req.body.userId,
            views: 0,
            comments: 0,
        }).then((post) => {
            res.status(200).json({
                message: "Post created successfully",
                post: post,
            });
        }).catch((err) => {
            res.status(500).json({
                message: "Error creating post",
                error: err,
            });
        });
    }
}

module.exports = allowCors(handler)