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
    settings: {},
    _settings: {
        logClientErrors: true
    },
    init: function(settings){
        this.settings = settings.getFor(this);
    }
};