if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose')
var bcrypt = require('bcrypt')
var opts = {
    server: {
        socketOptions: {keepAlive:1}
    }
}
switch (process.env.NODE_ENV) {
    case 'development':
        mongoose.connect(process.env.DEV_MONBODB_CONNECTION)
        break;
    case 'production':
        mongoose.connect(process.env.PROD_MONBODB_CONNECTION)
        break;
    default:
        throw new Error('Unknown execution environment')
}

/*
var userSchema = mongoose.Schema({
    username: {
        type: String, 
        unique: true,
        required: true,
        trim: true
    },
    useremail: {
        type: String, 
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
})
*/

var userSchema = mongoose.Schema({
    username: String,
    useremail: String,
    password: String
})

userSchema.plugin(passportLocalMongoose)
var User = mongoose.model('User', userSchema)

exports.User = User
exports.mongoose = mongoose
exports.userSchema = userSchema
