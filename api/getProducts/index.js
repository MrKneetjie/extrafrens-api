import { Product } from "../models";
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
    
    await Product.find().limit(20)
    .then((products) => {
        res.status(200).json({
            message: "Products fetched successfully",
            products: products,
        });
    }).catch((err) => {
        res.status(500).json({
            message: "Error fetching products",
            error: err,
        });
    });
}

module.exports = allowCors(handler)