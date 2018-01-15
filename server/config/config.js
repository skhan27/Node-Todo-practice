/*
Configuration of environment variable. Set env to either the process.env.NODE_ENV for production or test or set to development.
config.json stores the different environment variables if the code is being run in dev mode or test. We get the variables from
that file and set the env variables. The environment variables for production are set using heroku commands 
*/ 

var env = process.env.NODE_ENV || 'development';


if (env === 'development' || env === 'test') {
    var config = require('./config.json');
    var envConfig = config[env];

    Object.keys(envConfig).forEach((key)=> {
        process.env[key] = envConfig[key];
    });
}

console.log('env ****************', env);
