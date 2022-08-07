const app = require('express')();

const { Account } = require('./models.js');
const connectDB = require('./mongoose.js');

app.get('/api', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/createUser', async (req, res) => {
    await connectDB();

    // const newUser = new Account({ name: req.body.name, email: req.body.email, password: req.body.password, thumb: req.body.thumb, role: req.body.role });
    // await newUser.save();
    if (req.body.name) {
        res.send("Name is filled");
    }
    res.send("Name is empty");
});

module.exports = app;
