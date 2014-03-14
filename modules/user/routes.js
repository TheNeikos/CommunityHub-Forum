module.exports = function(app){

    var mongoose = require("mongoose");
    var User = mongoose.model("User");

    app.get('/api/users/', function(req, res){
        //TODO: Add Settings check for public member list. Does it need to be flexible? Aka, on load or runtime?

        User.find().exec(function(err, users){
            res.json(users);
        });
    });

    app.post('/api/user/new', function(req, res){
        User.create(req.body, function(err, user){
            if(err){
                res.json({error:{ message:err }}); //TODO: Make a better error reporter
                return;
            }
            res.json(user);
        });
    });

    app.get('/api/user/:id', function(req, res){
        User.find({id: req.params['id']}).exec(function(err, user){
            if(err){
                res.json({error:{ message:err }}); //TODO: Make a better error reporter
                return;
            }
            res.json(user);
        });
    });

};