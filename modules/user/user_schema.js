// The user model

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SessionSchema = new Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    expires_at: {
        type: Date,
        default: function () {
            return Date.now() + 60 * 60 * 24 * 7; //7 days
        }
    },
    bound_address: {
        type: String,
        required: true
    },
    hash_key: {
        type: String,
        required: true,
        default: function () {
            return require('crypto').createHash('md5').update(Date.now().toString()).digest('hex');
        }
    }
});

var UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password_hash: {
        type: String,
        required: true
    },
    password_salt: {
        type: String,
        required: true
    },
    sessions: [SessionSchema]
});



module.exports = UserSchema;

