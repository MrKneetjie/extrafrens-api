const app = require('express')();

const { Account } = require('./models.js');
const connectDB = require('./mongoose.js');

app.get('/api', async (req, res) => {
    await connectDB();

    console.log("Adding user to DB");
    const newUser = new Account({ username: "ExtraFrens", password: "TEST" });
    
    await newUser.save();
    console.log("Done!");
    
    res.send('Hello World!');
});

module.exports = app;
