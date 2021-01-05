const express = require("express");
const router = express.Router();

// //mongoDB queries
const { saveMessage } = require('../mongoQueries/saveMessage.js')

router.post("/messageWebHook", async (req, res) => {
    console.log("REECIVED WEBHOOK", req.body)
    res.send(200)
    const creator = req.body.sender.user_id
    const message = req.body.payload.message
    const channelURL = req.body.channel.channel_url
    const messageObj = { message, creator, channelURL }
    console.log(messageObj)
    try {
        return await saveMessage(messageObj)
    } catch (err) {
        return new Error(err);
    }
})

module.exports = router;