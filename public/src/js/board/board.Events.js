var fabricSettings = require('./../configurations/fabric.configure');
var socket = require('./../socket').getInstance();
var util = require('./../Utility/util');

module.exports = function () {
    var canvas = fabricSettings.getCanvas();

    canvas.on('object:added', function (e) {
        var fabricObject = e.target;
        if (fabricObject.remote === true) {
            fabricObject.remote = false;
            console.log("not again");
            return;
        }
        console.log('object:added');
        socket.emit('object:added', fabricObject);
    });

    socket.on('object:added', function (obj) {
        fabric.util.enlivenObjects([obj], function (fabricObjects) {
            console.log(fabricObjects);
            fabricObjects.forEach(function (fabricObject) {
                fabricObject.remote = true;
                canvas.add(fabricObject);
                canvas.renderAll();
            });
        });
    });

    canvas.on('object:modified', function (e) {
        var fabricObject = e.target;
        console.log("Object changed");
        socket.emit('object:modified', fabricObject);
        
    });

    socket.on('object:modified', function(rawObject){
        var fabricObject = util.getObjectById(canvas,rawObject._id);
        if(fabricObject){
            console.log("modified");
            fabricObject.set(rawObject);
            canvas.renderAll();
        }else{
            console.warn('No object found: ', rawObject._id);
        }
    });
    
    canvas.on('object:removed', function (e) {
        console.log("removed");
        var ObjectId = e.target._id;
        socket.emit('object:removed', ObjectId);
    });
    socket.on('object:removed', function(id){
        console.log('socket object removed')
        console.log(id);
        var fabricObject = util.getObjectById(canvas,id);
        if(fabricObject){
            canvas.remove(fabricObject);
            canvas.renderAll();
        }else{
            console.warn('No object found: ', id);
        }
    });
};