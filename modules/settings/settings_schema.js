// The user model

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SettingsSchema = new Schema({
    moduleName: {
        type: String,
        required: true
    },
    data: {}
});

module.exports = SettingsSchema;