var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    createdTime: {
        type: Date,
        default: Date.now()
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String
    },
    password: {
        type: String,
        required: true,
    },
    careProvider: {
        type: String
    },
    careProviderChannel: {
        type: String
    }
});



var User = mongoose.model('User', userSchema);

module.exports = User