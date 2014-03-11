var express = require("express");
var db = require("./lib/database");

var app = express();

app.version = {
    MAJOR: 0,
    MINOR: 0,
    PATCH: 1
};

require("./lib/user")(app);
require('./lib/modules')(app);

var server = app.listen(3000, function () {
    console.log("Listening on port %d", server.address().port);
});