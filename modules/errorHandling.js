var mongoose = require('mongoose');

module.exports = {
    name: 'errorHandling',
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
    description: "Settings for error handling.",
    defaultSettings: {
        logClientErrors: true
    },
    init: function(settings){
        settings.methods.getFor(this);
    }
};