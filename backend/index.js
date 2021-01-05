require('dotenv').config({ path: __dirname + '/.env' })
const bodyParser = require('body-parser')
const logger = require('morgan');

//express
const express = require('express')
const app = express()

//db
const mongoose = require('mongoose');
const connect = process.env.MONGOURI


mongoose.connect(connect, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log(`mongo connection successful ${connect}`))
    .catch(err => console.log(err));

mongoose.connection.on('connected', function () {
    console.log('mongo connection successful!');
})

mongoose.connection.on('error', err => {
    console.log("ERROR CONNECTING TO MONGODB", err)
})
mongoose.set('useFindAndModify', false);

//middleware
app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


//routing
const auth = require("./Routes/auth.js");
const userRoutes = require("./Routes/userRoutes.js");
const webhooks = require("./Routes/webhooks.js");
app.use('/', auth)
app.use('/', userRoutes)
app.use('/', webhooks)


var port = process.env.PORT || 3000


module.exports = app.listen(process.env.PORT, () => {
    console.log(`listening on ${port}`)
})



