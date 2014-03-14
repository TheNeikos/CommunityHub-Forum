var mongoose = require('mongoose');

module.exports = {
    name: 'schemaStore',
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
    description: "Gives the possibility of registering and modifying schemas.",
    schemas: {},
    methods: {
        registerSchemas: function(){
            for(var schema_key in this.schemas){
                var schema = this.schemas[schema_key];
                mongoose.model(schema_key, schema);
            }
        }
    }
};