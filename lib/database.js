// Here we handle the Database connections

var mongoose = require("mongoose");
var extend = require("mongoose-schema-extend");

var connection = mongoose.connect("mongodb://localhost/CommunityHub");

require('./models/basic_node_model');
require('./models/user_model');


module.exports = connection;