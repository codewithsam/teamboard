var socket = require('./../socket').getInstance();
var fabricSettings = require('./../configurations/fabric.configure');
var boardUI = require('./board.UI');
var boardEvents = require('./board.Events');


var canvas;
var loaded = false;


function Board() {
    var self = this;

    socket.on('connect', function () {
        canvas = new fabric.Canvas(fabricSettings.canvasId, fabricSettings);
        window._canvas = canvas;
        var objectList = [];
        if (sessionStorage.length < 1) {
            // Todo: Get data from database
        } else {
            for (var i = 0; i < sessionStorage.length; i++) {
                objectList.push(JSON.parse(sessionStorage.getItem(sessionStorage.key(i))));
            }
            fabric.util.enlivenObjects(objectList, function (fabricObjects) {
                console.log(fabricObjects);
                fabricObjects.forEach(function (fabricObject) {
                    canvas.add(fabricObject);
                    canvas.renderAll();
                });
            });
        }
        fabricSettings.setCanvas(canvas);
        console.log("socket connected to server");

        if (loaded) {
            console.log("app already loaded");
        } else {
            self.initUI();
            self.initEvents();
        }
    });
}



Board.prototype.initUI = boardUI;
Board.prototype.initEvents = boardEvents;


module.exports = Board;