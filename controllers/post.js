const snoowrap = require('snoowrap');

const { Post, User } = require('../cron.js');

const { AUTH_CLIENT_ID, AUTH_CLIENT_SECRET, AUTH_REDIRECT_URI, USER_AGENT } = process.env;

const post = async (reddit, submission, refreshToken) => {
    try {
        return reddit
            .getSubreddit(submission.sub)
            .submitSelfpost({title: submission.title, text: submission.text, flairId: submission.flair}); // over_18: true
    } catch (err) {
        console.log(err);
    }
}

const fromAuth = async (req, res) => {
    if(req.body.account === "" || req.body.accountName === "" || req.body.submission.title === "" || req.body.submission.text === "" || req.body.submission.sub === "" || req.body.submission.date === "" || req.body.submission.flair === "") {
        console.log("Empty request property!");
        res.send('404');
        return
    }

    User.findOne({ username: req.body.account.endsWith("\r") ? req.body.account.slice(0, -1) : req.body.account }, (err, user) => {
        if(err) {
            console.log(err);
        }

        if (req.body.submission.date != 'now') {
            let date = new Date(req.body.submission.date);
            date.setHours(date.getHours() + 8);

            const newPost = new Post({ code: user.refreshToken, date: date, sub: req.body.submission.sub, title: req.body.submission.title, text: req.body.submission.text, posted: false, username: req.body.accountName });
    
            newPost.save();
    
            res.send('200');
            return;
        }
    
        const response = new snoowrap({
            userAgent: USER_AGENT,
            clientId: AUTH_CLIENT_ID,
            clientSecret: AUTH_CLIENT_SECRET,
            refreshToken: user.refreshToken
        });

        post(response, req.body.submission, user.refreshToken).then(res => {
            let date = new Date();
            const newPost = new Post({ code: user.refreshToken, date: date, sub: req.body.submission.sub, title: req.body.submission.title, text: req.body.submission.text, posted: true, link: res.name, flair: req.body.submission.flair, username: req.body.accountName});
    
            newPost.save();
        }).catch(err => {
            console.log(err);

            if (err.toString().includes("RATELIMIT")) {
                let time = err.toString().split(" ")[13];

                if (err.toString().split(" ")[14].startsWith('s')) {
                    time /= 60;
                } else if (err.toString().split(" ")[14].startsWith('h')) {
                    time *= 60;
                } else if (err.toString().split(" ")[14].startsWith('d')) {
                    time *= 60*24;
                }

                // let date = new Date(new Date().getTime() + (time * 60000));
                let date = new Date();
                const newPost = new Post({ code: user.refreshToken, date: date, sub: req.body.submission.sub, title: req.body.submission.title, text: req.body.submission.text, posted: false });
        
                newPost.save();
            }
        });
    
        res.send('200');
    });
};

const cancelPost = async (req, res) => {
    Post.findById(req.body.id).remove(() => {
        res.status(200);
    });

    res.status(500);
}

const getPosts = async (req, res) => {
    const posts = await Post.find({ username: req.params.username });

    res.send(posts);
};

const getFlairs = async (req, res) => {
    User.findOne({ username: "Shot_Perception675" }, (err, user) => {
        if(err) {
            console.log(err);
        }

        const reddit = new snoowrap({
            userAgent: USER_AGENT,
            clientId: AUTH_CLIENT_ID,
            clientSecret: AUTH_CLIENT_SECRET,
            refreshToken: user.refreshToken
        });

        reddit.getSubreddit(req.body.sub).getLinkFlairTemplates().then(result => res.status(200).json({flairs: result}));
    }).catch(err => {
        res.status(500);
    });

    res.status(500);
}

module.exports = {
    fromAuth,
    getPosts,
    cancelPost,
    getFlairs,
};