import { Account } from "../models";
const connectDB = require('../mongoose.js');

export default async function handler(req, res) {
    await connectDB();

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