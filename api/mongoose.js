const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect('mongodb+srv://david:Mongo001@cluster0.vtaha.mongodb.net/verified?retryWrites=true&w=majority');
    }
    catch (err) {
        console.log(err)
    }
};
