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