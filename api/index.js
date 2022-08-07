const app = require('express')();

const { Account } = require('./models.js');
const connectDB = require('./mongoose.js');

app.get('/api', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/createUser', async (req, res) => {
    const { body } = req;
    await connectDB();

    // const newUser = new Account({ name: req.body.name, email: req.body.email, password: req.body.password, thumb: req.body.thumb, role: req.body.role });
    // await newUser.save();
    if (body) {
        if (body.name) {
            res.send("Name is filled");
        } else {
            res.send("Body not empty");
        }
    } else {
        res.send("Name is empty");
    }
});

module.exports = app;
