var mongoose = require('mongoose');


var messageSchema = mongoose.Schema({
    createdTime: {
        type: Date,
        default: Date.now()
    },
    message: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    channelURL: {
        type: String,
        required: true
    }
});



var Message = mongoose.model('Message', messageSchema);

module.exports = Message