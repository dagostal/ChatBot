const User = require('../Models/User.js')


const getUserById = userID => {
    return new Promise(function (resolve, reject) {
        User.findOne({ _id: userID }, function (err, user) {
            if (err) return reject(new Error(err))
            if (!user) return reject("no user found");
            resolve(user)
        })
    })
}

const getUserByEmail = email => {
    return new Promise(function (resolve, reject) {
        User.findOne({ email: email }, function (err, user) {
            if (err) return reject("mongodb Error");
            if (!user) return reject("no user found");
            resolve(user)
        })
    })
}


module.exports = { getUserById, getUserByEmail }