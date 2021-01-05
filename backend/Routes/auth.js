const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const User = require('../Models/User.js')
const { createChannel, createUser } = require("../SendBird/sendbird.js")
// //mongoDB queries
const { getUserByEmail } = require('../mongoQueries/getUser.js')



router.post("/login", async (req, res) => {
    if (!req.body.email || !req.body.password) return res.json({ "error": "missing email or password" })
    let mongoUser;
    try {
        mongoUser = await getUserByEmail(req.body.email)
    } catch (err) {
        return res.json({ "error": err })
    }
    bcrypt.compare(req.body.password, mongoUser.password, (err, isMatch) => {
        if (err) {
            return res.json({ error: "expected password to be string" })
        }
        if (isMatch) {
            const userObj = {
                id: mongoUser._id,
                email: mongoUser.email
            }
            return res.json(userObj);
        } else return res.json({ error: "wrong password" })
    })
})

router.post("/signup", async (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.name) return res.json({ "error": "missing email or password or name" })
    let newUser;
    try {
        //create User and channel in sendbird
        const sendBirdUser = await createUser(req.body.email, req.body.name)
        if (!sendBirdUser.isCreated) return res.json({ "error:": "error in sendbird acct creation" });
        //createUser in mongo                
        newUser = new User({ email: sendBirdUser.userId, name: sendBirdUser.nickname, careProvider: req.body.careProvider })
        if (req.body.careProvider) {
            const channel = await createChannel(sendBirdUser.userId, req.body.careProvider)
            newUser.careProviderChannel = channel.channelUrl
        }
    } catch (err) {
        return res.json({ "error": err.toString() })
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) return res.json({ error: "expected password to be string" })
            newUser.password = hash;
            newUser.save()
                .then(user => {
                    console.log(`saved new user! ${user}`)
                    const userReturnObj = {
                        id: user._id,
                        email: user.email
                    }
                    return res.json(userReturnObj);
                })
                .catch(err => {
                    console.log(`error creating new user:${err}`)
                    return res.json({ error: err });
                });
        });
    });
})



module.exports = router;