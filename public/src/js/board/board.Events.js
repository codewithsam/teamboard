var fabricSettings = require('./../configurations/fabric.configure');
var socket = require('./../socket').getInstance();
var util = require('./../Utility/util');
var UndoRedo = require('./undoRedo');

module.exports = function () {
    var canvas = fabricSettings.getCanvas();

    canvas.on('object:added', function (e) {
        var fabricObject = e.target;
        if (fabricObject.remote === true) {
            fabricObject.remote = false;
            sessionStorage.setItem(fabricObject._id, JSON.stringify(fabricObject));
            console.log("not again");
            return;
        }
        if(!fabricObject.dustbin)UndoRedo.addObjectInState(JSON.stringify(fabricObject));
        else fabricObject.dustbin = null;
        sessionStorage.setItem(fabricObject._id, JSON.stringify(fabricObject));
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
        console.log(e);
        var fabricObject = e.target;
        console.log(e.target);
        sessionStorage.removeItem(fabricObject._id);
        sessionStorage.setItem(fabricObject._id, JSON.stringify(fabricObject));
        console.log("Object changed");
        UndoRedo.modifyObjectInState(JSON.stringify(fabricObject));
        socket.emit('object:modified', fabricObject);

    });

    socket.on('object:modified', function (rawObject) {
        console.log(rawObject);
        var fabricObject = util.getObjectById(canvas, rawObject._id);
        if (fabricObject) {
            console.log("modified");
            fabricObject.set(rawObject);
            sessionStorage.removeItem(fabricObject._id);
            sessionStorage.setItem(fabricObject._id, JSON.stringify(fabricObject));
            canvas.renderAll();
        } else {
            console.warn('No object found: ', rawObject._id);
        }
    });

    canvas.on('object:removed', function (e) {
        console.log("removed");
        var ObjectId = e.target._id;
        console.log(ObjectId);
        sessionStorage.removeItem(ObjectId);
        sessionStorage.getItem(ObjectId);
        if(!e.target.dustbin)UndoRedo.removeObjectInState(e.target);
        else e.target.dustbin = null;

        socket.emit('object:removed', ObjectId);
    });
    socket.on('object:removed', function (id) {
        console.log('socket object removed');
        console.log(id);
        var fabricObject = util.getObjectById(canvas, id);
        if (fabricObject) {
            canvas.remove(fabricObject);
            sessionStorage.removeItem(id);
            canvas.renderAll();
        } else {
            console.warn('No object found: ', id);
        }
    });
};