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
    
    if (!req.body.name || !req.body.email || !req.body.password || !req.body.role || !req.body.thumb) {
        res.status(400).json({
            message: "Missing required fields",
        });
    } else {
        await Account.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            thumb: req.body.thumb,
        }).then((account) => {
            res.status(200).json({
                message: "Account created successfully",
                account: account,
            });
        }).catch((err) => {
            res.status(500).json({
                message: "Error creating account",
                error: err,
            });
        });
    }
}

module.exports = allowCors(handler)