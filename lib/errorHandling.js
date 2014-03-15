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
        };
    });
};