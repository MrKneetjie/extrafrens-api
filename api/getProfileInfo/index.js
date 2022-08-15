import { Account } from "../models";
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
    
    if (!req.body.account) {
        res.status(400).json({
            message: "Missing required fields",
        });
    } else {
        await Account.findOne({ id: req.body.account })
        .then((account) => {
            res.status(200).json({
                message: "Posts fetched successfully",
                account: account,
            });
        }).catch((err) => {
            res.status(500).json({
                message: "Error fetching posts",
                error: err,
            });
        });
    }
}

module.exports = allowCors(handler)