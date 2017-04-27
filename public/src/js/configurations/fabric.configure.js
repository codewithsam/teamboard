var canvas;
var scaleFactor = 1.01;
function setCanvas(c){
    canvas = c;
}
function getCanvas(){
    return canvas;
}

function getScale(){
    return parseFloat(scaleFactor,10);
}

module.exports = {
    isDrawingMode: false,
    canvasId: 'canvas',
    transparentCorners: false,
    defaultScale: 1,
    getScale: getScale,
    setCanvas: setCanvas,
    getCanvas: getCanvas
};