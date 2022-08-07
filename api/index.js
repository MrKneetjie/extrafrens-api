const app = require('express')();

const { Account } = require('./models.js');
const connectDB = require('./mongoose.js');

app.get('/api', (req, res) => {
    res.send('Hello World!');
});

app.post('/createUser', async (req, res) => {
    await connectDB();
    
    // const newUser = new Account({ name: req.body.name, email: req.body.email, password: req.body.password, thumb: req.body.thumb, role: req.body.role });
    // await newUser.save();

    res.send(req.body);
});

module.exports = app;
