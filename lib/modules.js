// This will load the individual plugins and allow them to be configured.
/*
 * Each plugin file/directory should return a single object that ultimately defines it.
 * Required fields are:
 *   name
 *   author
 *   version (SemVer)
 *   requiredVersion
 *   init
 *
 * On startup the init function gets called and allows the app to hook itself into the application.
 * */


module.exports = function (app) {
    var fs = require("fs");
    var plugin_files = fs.readdirSync('./modules');
    app.plugins = {};

    plugin_files.forEach(function (file) {
        var plugin = require("../modules/" + file);
        app.plugins[plugin.name] = plugin;
    });

    //TODO: Check if the plugin is compatible with this version of CommunityHub
    //TODO: Check if the plugin has been enabled/disabled

    for (var plugin in app.plugins) { //Once we have loaded all the modules we can init them
        if (app.plugins.hasOwnProperty(plugin)) {
            app.plugins[plugin].init(app);
        }
    }
};