// This will load the individual plugins and allow them to be configured.
/*
 * Each plugin file/directory should return a single object that ultimately defines it.
 * Required fields are:
 *   name
 *   author
 *   version (SemVer)
 *   requiredVersion
 *
 * On startup the init function gets called and allows the app to hook itself into the application.
 * */
var fs = require("fs");

module.exports = function (app) {
    var module_files = fs.readdirSync('./modules');
    app.modules = {};

    module_files.forEach(function (file) {
        var module = require("../modules/" + file);
        app.modules[module.name] = module;
        if("undefined" === typeof module.dependencies){ //If there are manual dependencies then those take priority
            if("undefined" !== typeof module.init)
            {
                module.dependencies = module.init.toString()
                    .match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1]
                    .split(',');
            }else{
                module.dependencies = []; //None since no manual dependencies and nothing to init
                module.__initialized = true;
            }
        }

        if(module.methods){ //Here we proxy the methods onto the module so that this always references the whole model
            for(var method_name in module.methods){
                module._methods = module.methods[method_name]; //In case one needs the 'raw' function
                module.methods[method_name] = module.methods[method_name].bind(module);
            }
        }
    });

    for(var module_name in app.modules){
        //noinspection JSUnfilteredForInLoop
        var module = app.modules[module_name];
        if (!(module.requiredVersion.MAJOR >= app.version.MAJOR ||
            module.requiredVersion.MINOR >= app.version.MINOR ||
            module.requiredVersion.PATCH >= app.version.PATCH)) {

            module.disabled = true;
            app.modules.get('error_reporter').addError( "ModuleInitError",
                "Module '" + module.name +
                    "' is for a more recent version. It needs at least" +
                    module.version.MAJOR + "." +
                    module.version.MINOR + "." +
                    module.version.PATCH
            );
            return;
        }

        injectDependencies(module);

    }

    function injectDependencies(module){
        if(module.__initialized)
        {
            return module; //Already has been initialized
        }

        var deps = module.dependencies.map(function(dep){
            if(dep == ''){ return undefined; }
            if(dep.trim() === 'application'){
                return app;
            }
            var mod = app.modules[dep.trim()];
            if(!mod){
                //TODO: Hard error out because it's missing a dependecy
                console.log("Missing dependency '"+ dep.trim()+"'");
                return undefined;
            }
            if(mod.__initialized){
                return mod;
            }else{
                return injectDependencies(mod); //TODO: Check for circular dependency
            }
        });
        module.init.apply(module, deps);
        module.__initialized = true;
        return module;
    }


    app.modules["schemaStore"].methods.registerSchemas(); //We call this later so that all schema mods are registered

    for(var module_name in app.modules){
        //noinspection JSUnfilteredForInLoop
        var module = app.modules[module_name];

        if(module.routes){
            module.routes(app);
        }

    }

    //TODO: Add an errors module
    //TODO: Check if the module has been enabled/disabled in the config



};