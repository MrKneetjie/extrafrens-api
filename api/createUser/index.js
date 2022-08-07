const connectDB = require('../mongoose.js');

export default async function handler(req, res) {
    await connectDB();

    res.status(200).json({
        body: req.body,
        query: req.query,
        cookies: req.cookies,
    });
}

// import { Account } from "./models";
// const connectDB = require('./mongoose.js');

// export default async function handler(req, res) {
//     await connectDB();
    
//     if (!req.body.name || !req.body.email || !req.body.password || !req.body.role || !req.body.thumb) {
//         res.status(400).json({
//             message: "Missing required fields",
//         });
//     } else {
//         await Account.create({
//             name: req.body.name,
//             email: req.body.email,
//             password: req.body.password,
//             role: req.body.role,
//             thumb: req.body.thumb,
//         }).then((account) => {
//             res.status(200).json({
//                 message: "Account created successfully",
//                 account: account,
//             });
//         }).catch((err) => {
//             res.status(500).json({
//                 message: "Error creating account",
//                 error: err,
//             });
//         });
//     }
// }