var configs = require('./configurations/app.configure');
var socket = require('socket.io-client');
var instance;
var host = configs.host;
var port = configs.port;

var createSocket = function () {
    console.log("Created new socket object. (socket is singleton)");
    return socket(host + ":" + port);
    
}

var getInstance = function () {
    if (!instance) {
        instance = createSocket();
    }
    return instance;
};

module.exports.getInstance = getInstance;