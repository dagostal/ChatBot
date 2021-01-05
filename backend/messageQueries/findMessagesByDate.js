const { getMessageByDate } = require('../mongoQueries/saveMessage.js')

//db
const mongoose = require('mongoose');
const connect = process.env.MONGOURI


const date = new Date(process.argv[2])

mongoose.connect(connect, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        getMessageByDate(date)
            .then(messages => {
                console.log(messages)
            }).catch(err => {
                console.log(err)
            })

    })
    .catch(err => console.log(err));

