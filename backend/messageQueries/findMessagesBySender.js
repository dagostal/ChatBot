const { getMessageBySender } = require('../mongoQueries/saveMessage.js')


//db
const mongoose = require('mongoose');
const connect = process.env.MONGOURI

const userToSearch = process.argv[2]

mongoose.connect(connect, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        getMessageBySender(userToSearch)
            .then(messages => {
                console.log(messages)
            }).catch(err => {
                console.log(err)
            })

    })
    .catch(err => console.log(err));

