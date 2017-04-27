var fabricSettings = require('./../configurations/fabric.configure');

module.exports = function () {
    var canvas = fabricSettings.getCanvas();

    canvas.on('object:modified', function(e){
        console.log("Object changed");
    });
    canvas.on('object:added', function(e){
        console.log('object:added');
    });
    canvas.on('object:removed', function(e){
        console.log('object:removed');        

    });
    canvas.on('object:selected', function(e){

    });
};