const { getMessageByChannel } = require('../mongoQueries/saveMessage.js')

//db
const mongoose = require('mongoose');
const connect = process.env.MONGOURI

const channelToSearch = process.argv[2]

mongoose.connect(connect, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        getMessageByChannel(channelToSearch)
            .then(messages => {
                console.log(messages)
            }).catch(err => {
                console.log(err)
            })

    })
    .catch(err => console.log(err));

