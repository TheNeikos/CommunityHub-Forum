module.exports = {
    name: 'User',
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
    description: "Registers the schema and paths for the User.",
    init: function(schemaStore){
        schemaStore.schemas["User"] = require('./user_schema');
    },
    routes: require('./routes'),
    methods: {}
};