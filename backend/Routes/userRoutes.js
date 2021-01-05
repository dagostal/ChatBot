const express = require("express");
const router = express.Router();

// //mongoDB queries
const { getUserById } = require('../mongoQueries/getUser.js')

router.post("/getUser", async (req, res) => {
    if (!req.body.userId) return res.json(false)
    try {
        const mongoUser = await getUserById(req.body.userId);
        const returnUserObj = {
            id: mongoUser._id,
            email: mongoUser.email,
            name: mongoUser.name,
            careProvider: mongoUser.careProvider,
            careProviderChannel: mongoUser.careProviderChannel
        }
        return res.json(returnUserObj)
    } catch (err) {
        return res.json(false)
    }
})

module.exports = router;