var fabricSettings = require('./../configurations/fabric.configure');
var socket = require('./../socket').getInstance();

module.exports = function () {
    var canvas = fabricSettings.getCanvas();

    canvas.on('object:modified', function(e){
        console.log("Object changed");
    });
    canvas.on('object:added', function(e){
        console.log('object:added');
        socket.emit('object:added', {m:"Hello world"});
    });
    canvas.on('object:removed', function(e){
        console.log('object:removed');        

    });
    canvas.on('object:selected', function(e){

    });

    socket.on('object:added', function(msg){
        console.log(msg.m);
    });
};