var mongoose = require('mongoose');

function mergeObjects(left, right){
    for(var l in left){
        if(!left.hasOwnProperty(l)) continue;
        if(!right[l]){
            right[l] = left[l];
        }
    }
}

module.exports = {
    name: 'settings',
    author: '',
    requiredVersion: {
        MAJOR: 0,
        MINOR: 0,
        PATCH: 1
    },
    version: {
        MAJOR: 0,
        MINOR: 0,
        PATCH: 1
    },
    description: "Saves and loads settings for Modules.",
    init: function(schemaStore){
        schemaStore.schemas["Setting"] = require('./settings_schema');
    },
    methods: {
        getFor: function(target){
            var Setting = mongoose.model("Setting");

            Setting.findOne({moduleName: target.name}).exec(function(err, setting){
                if(!setting){
                    target.settings = mergeObjects(setting.data, target.defaultSettings());
                }else{
                    target.settings = target.defaultSettings;
                }
            });
        }
    }
};