const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    seller_name: String,
    seller_avatar: String,
    description: String,
    price: Number,
});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };