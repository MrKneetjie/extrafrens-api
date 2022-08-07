const app = require('express')();

const connectDB = require('./mongoose.js');

app.get('/api', async (req, res) => {
    await connectDB();

    res.send('Hello World!');
});

module.exports = app;
