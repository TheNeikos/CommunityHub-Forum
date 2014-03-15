var mongoose = require('mongoose')

module.exports = function(app){
    app.use(function(req, res, next){
        res.error = function(id, data){
            var ret = {id: id};
            if("object" == typeof data){
                ret.data = data;
            }else if("string" == typeof data){
                ret.data = {message: data};
            }
            res.json(200,ret);

            if(app.modules.settings.settings.logClientErrors){
                var user_id = req.user && req.user.id || undefined;
                mongoose.model("ClientErrorLog").create({
                    user: user_id,
                    errorId: id,
                    data: ret.data
                });
            }
        };
    });
};