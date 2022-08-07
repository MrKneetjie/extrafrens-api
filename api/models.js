const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    thumb: String,
    role: String,
});

const Account = mongoose.model('Account', accountSchema);

module.exports = { Account };