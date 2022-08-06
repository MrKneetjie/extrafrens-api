const { Post, User, Account } = require('../cron.js');

const getAmounts = async (req, res) => {
    let monthPosts = 0;
    let weekPosts = 0;
    let dayPosts = 0;

    let accountsAmount = 0;
    let usersAmount = 0;
    
    Post.find({date: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
        $lt: new Date()
    }}, (err, x) => {
        if (err) {
            console.log(err);
            res.status(500);
            return;
        }

        monthPosts = x.length;

        Post.find({date: {
            $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
            $lt: new Date()
        }}, (err, y) => {
            if (err) {
                console.log(err);
                res.status(500);
                return;
            }

            weekPosts = y.length;

            Post.find({date: {
                $gte: new Date(new Date().setDate(new Date().getDate() - 1)),
                $lt: new Date()
            }}, (err, z) => {
                if (err) {
                    console.log(err);
                    res.status(500);
                    return;
                }
        
                console.log(z);
                dayPosts = z.length;

                Account.find({}, (err, accounts) => {
                    if (err) {
                        console.log(err);
                        res.status(500);
                        return;
                    }
            
                    accountsAmount = accounts.length;

                    User.find({}, (err, users) => {
                        if (err) {
                            console.log(err);
                            res.status(500);
                            return;
                        }
                
                        usersAmount = users.length;

                        res.status(200).json({
                            posts: {
                                monthPosts,
                                weekPosts,
                                dayPosts,
                            },
                            accounts: accountsAmount,
                            users: usersAmount,
                        });
                    })
                })
            })
        })
    })
};

module.exports = {
    getAmounts,
};