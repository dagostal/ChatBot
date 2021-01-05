require('dotenv').config({ path: __dirname + '/../.env' })


const masterToken = process.env.MASTERTOKEN
const sendBirdURL = process.env.SENDBIRDURL


const fetch = require('node-fetch');


const createUser = async (userId, name) => {
    if (!userId || !name) throw new Error('userid and name required')
    try {
        const body = {
            "user_id": userId,
            "nickname": name,
            "profile_url": "",
            "issue_session_token": false,
            "issue_access_token": false
        }
        let response = await fetch(sendBirdURL + '/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Api-Token': masterToken
            },
            body: JSON.stringify(body),
        })
        let json = await response.json();
        if (json.error) throw new Error(json.message)
        return { userId: json.user_id, nickname: json.nickname, isCreated: json.is_created }
    } catch (err) {
        throw new Error(err)
    }
}


const createChannel = async (userId, careProvider) => {
    if (!userId || !careProvider) throw new Error('no userId or Care Provider')
    try {
        const body = {
            "name": `${userId} and ${careProvider}`,
            "user_ids": [userId, careProvider],
            "is_distinct": true,
            "is_public": false,
            "is_ephemeral": false
        }
        let response = await fetch(sendBirdURL + '/group_channels', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Api-Token': masterToken
            },
            body: JSON.stringify(body),
        })
        let json = await response.json();
        if (!json.is_created) throw new Error("error creating channel")
        return { name: json.name, channelUrl: json.channel_url, isCreated: json.is_created }
    } catch (err) { throw new Error(err) }
}


module.exports = { createChannel, createUser }
