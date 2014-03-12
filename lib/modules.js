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

    for(var plugin_name in app.plugins){
        var plugin = app.plugins[plugin_name];
        if (!(plugin.requiredVersion.MAJOR >= app.version.MAJOR ||
            plugin.requiredVersion.MINOR >= app.version.MINOR ||
            plugin.requiredVersion.PATCH >= app.version.PATCH)) {

            plugin.disabled = true;
            app.modules.get('error_reporter').addError( "ModuleInitError",
                "Module '" + plugin.name +
                    "' is for a more recent version. It needs " +
                    plugin.version.MAJOR + "." +
                    plugin.version.MINOR + "." +
                    plugin.version.PATCH
            );
            return;
        }

        injectDependencies(plugin);

    }

    function injectDependencies(plugin){
        if(plugin.__initialized)
        {
            return plugin; //Already has been initialized
        }
        var dependencies = plugin.init.toString()
            .match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1]
            .split(',');

        var deps = dependencies.map(function(dep){
            if(dep == ''){ return undefined; }

            var plug = app.plugins[dep.trim()];
            if(!plug){
                //TODO: Hard error out because it's missing a dependecy
                console.log("Missing dependency '"+ dep.trim()+"'");
                return undefined;
            }
            if(plug.__initialized){
                return plug;
            }else{
                return injectDependencies(plug); //TODO: Check for circular dependency
            }
        });
        plugin.init.apply(plugin, deps);
        plugin.__initialized = true;
        return plugin;
    }




    //TODO: Add an errors module
    //TODO: Check if the plugin has been enabled/disabled in the config



};