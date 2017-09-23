var configs = require('./configurations/app.configure');
var socket = require('socket.io-client');
var instance;
var host = configs.host;
var port = configs.port;
var connectionString = "";

if (configs.port){
	connectionString = host + ":"+port;
}else{
	connectionString = host;
}

var createSocket = function () {
    console.log("Created new socket object. (socket is singleton)");
    return socket(connectionString);
    
}

var getInstance = function () {
    if (!instance) {
        instance = createSocket();
    }
    return instance;
};

module.exports.getInstance = getInstance;