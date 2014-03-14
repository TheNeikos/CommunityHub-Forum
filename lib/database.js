// Here we handle the Database connections

var mongoose = require("mongoose");
var extend = require("mongoose-schema-extend");

var connection = mongoose.connect("mongodb://localhost/CommunityHub");


module.exports = connection;