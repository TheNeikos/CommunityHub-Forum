var express = require("express");
var db = require("./lib/database");

var app = express();

require('./lib/modules')(app);


var server = app.listen(3000, function(){
    console.log("Listening on port %d", server.address().port);
});