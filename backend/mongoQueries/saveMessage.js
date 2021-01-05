const Message = require('../Models/Message.js')


const saveMessage = message => {
    return new Promise(function (resolve, reject) {
        newMessage = new Message({ message: message.message, creator: message.creator, channelURL: message.channelURL })
        newMessage.save()
            .then(mess => {
                console.log(`saved new message! ${mess}`)
                resolve(true)
            })
            .catch(err => {
                console.log(`error creating new message:${err}`)
                reject(false)
            });
    })
}


const getMessageBySender = userId => {
    return new Promise(function (resolve, reject) {
        Message.find({ creator: userId }, function (err, mesages) {
            if (err) return reject(new Error(err))
            if (!mesages) return reject("no messages found");
            resolve(mesages)
        })
    })
}


const getMessageByChannel = channelurl => {
    return new Promise(function (resolve, reject) {
        Message.find({ channelURL: channelurl }, function (err, mesages) {
            if (err) return reject(new Error(err))
            if (!mesages) return reject("no messages found");
            resolve(mesages)
        })
    })
}

const getMessageByDate = date => {
    return new Promise(function (resolve, reject) {
        Message.find({ createdTime: date }, function (err, mesages) {
            if (err) return reject(new Error(err))
            if (!mesages) return reject("no messages found");
            resolve(mesages)
        })
    })
}


module.exports = { saveMessage, getMessageBySender, getMessageByChannel, getMessageByDate }