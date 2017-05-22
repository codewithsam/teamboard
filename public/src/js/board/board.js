var socket = require('./../socket').getInstance();
var fabricSettings = require('./../configurations/fabric.configure');
var boardUI = require('./board.UI');
var boardEvents = require('./board.Events');
require('./CustomClass/Stickynote');


var canvas;
var loaded = false;


function Board() {
    var self = this;

    socket.on('connect', function () {
        canvas = new fabric.Canvas(fabricSettings.canvasId, fabricSettings);
        window._canvas = canvas;
        if(sessionStorage.length>0){
            var sessid = sessionStorage.getItem('sessid');
            if(window._globalBoardData._id !== sessid){
                sessionStorage.clear();
            }
        }

        var objectList = [];
        if (sessionStorage.length < 1) {
            // console.log(window._globalBoardData.data);
            var ObjectDataList = window._globalBoardData.data;
            sessionStorage.setItem('sessid', window._globalBoardData._id);
            for (var i = 0; i < ObjectDataList.length; i++) {
                sessionStorage.setItem(ObjectDataList[i].guid, JSON.stringify(ObjectDataList[i].data));
                objectList.push(ObjectDataList[i].data);
            }
        } else {
            for (var j = 0; j < sessionStorage.length; j++) {
                if(sessionStorage.key(j) === 'sessid')continue;
                objectList.push(JSON.parse(sessionStorage.getItem(sessionStorage.key(j))));
            }
        }
        fabric.util.enlivenObjects(objectList, function (fabricObjects) {
            // console.log(fabricObjects);
            fabricObjects.forEach(function (fabricObject) {
                canvas.add(fabricObject);
                canvas.renderAll();
            });
        });
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