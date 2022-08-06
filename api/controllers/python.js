const fs = require('fs');
const csvStringify = require('csv-stringify');
const { exec } = require('child_process');

const bulkAccountUpload = async (req, res) => {
    let users = [];

    req.body.users.forEach(user => {
        users.push([user.username, user.password])
    });

    csvStringify.stringify(users, { header: false }, (err, output) => {
        if (err) console.log(err);
        fs.writeFile('accounts.csv', output, (err) => {
            if (err) console.log(err);
            console.log('accounts.csv saved.');

            exec('python3 refresh-token.py',
            (error, stdout, stderr) => {
                console.log(stdout);
                console.log(stderr);
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                }
            });

            res.status(200)
        });
    });

    res.status(500);
};

const bulkBotUpload = async (req, res) => {
    let users = [];

    req.body.users.forEach(user => {
        users.push([user.username, user.password])
    });

    csvStringify.stringify(users, { header: false }, (err, output) => {
        if (err) console.log(err);
        fs.writeFile('bots.csv', output, (err) => {
            if (err) console.log(err);
            console.log('bots.csv saved.');

            exec('python3 refresh-token-bots.py',
            (error, stdout, stderr) => {
                console.log(stdout);
                console.log(stderr);
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                }
            });

            res.status(200)
        });
    });

    res.status(500);
};

const bulkUnblockAccount = async (req, res) => {
    let users = [];

    req.body.users.forEach(user => {
        users.push([user.username, user.password])
    });

    csvStringify.stringify(users, { header: false }, (err, output) => {
        if (err) console.log(err);
        fs.writeFile('unblock-accounts.csv', output, (err) => {
            if (err) console.log(err);
            console.log('unblock-accounts.csv saved.');

            exec('python3 unblock-accounts.py',
            (error, stdout, stderr) => {
                console.log(stdout);
                console.log(stderr);
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                }
            });

            res.status(200)
        });
    });

    res.status(500);
};

const massDm = async (req, res) => {
    try {
        exec(`python3 ./Reddit_ChatBot_Python-master/reddit_chat-cli.py ${req.body.login.username} ${req.body.login.password} '${req.body.message}' ${req.body.users.join(" ")}`,
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });

        res.status(200)
    } catch (err) {
        console.log(err);
        res.status(500);
    }
};

module.exports = {
    bulkAccountUpload,
    bulkBotUpload,
    bulkUnblockAccount,
    massDm
};