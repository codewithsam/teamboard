/**
 ** Some day we will try this kind of code for async if required.
    
        // module.exports.createText = function (o, cb) {
        //     setTimeout(function () {
        //         var obj = new fabric.IText('Edit me...', o);
        //         cb(null, textObject);
        //     }, 0);
        // }
 
 */

var util = require('./../Utility/util');

var canvas;

module.exports.initialize = function (c) {
    canvas = c;

    canvas.on('set:scale', function (o) {
        if (o.width) o.width = o.width * 1 / canvas.getZoom();
        if (o.height) o.height = o.height * 1 / canvas.getZoom();
        if (o.fontSize) o.fontSize = o.fontSize * 1 / canvas.getZoom();
        if (o.radius) o.radius = o.radius * 1 / canvas.getZoom();

        // SCALE_FACTOR = canvas.getZoom();

        // var canvasScale = canvasScale * 1/ SCALE_FACTOR;
        // var scaleX = o.scaleX;
        // var scaleY = o.scaleY;
        // var left = o.left;
        // var top  = o.top;

        // var tempScaleX = scaleX * SCALE_FACTOR;
        // var tempScaleY = scaleY * SCALE_FACTOR;
        // var tempLeft = left * SCALE_FACTOR;
        // var tempTop = top * SCALE_FACTOR;

        // o.scaleX = tempScaleX;
        // o.scaleY = tempScaleY;
        // o.left = tempLeft;
        // o.top = tempTop;
        // o.setCoords();

        // canvas.renderAll();

        console.log("Fired event 'set:scale', setting scale");
    });

    canvas.on('object:serialize', function (o) {
        o._id = util.guid();
        o.remote = false;
    });
};



function regularPolygonPoints(sideCount, radius) {
    var sweep = Math.PI * 2 / sideCount;
    var cx = radius;
    var cy = radius;
    var points = [];
    for (var i = 0; i < sideCount; i++) {
        var x = cx + radius * Math.cos(i * sweep);
        var y = cy + radius * Math.sin(i * sweep);
        points.push({
            x: x,
            y: y
        });
    }
    return (points);
}


function starPolygonPoints(spikeCount, outerRadius, innerRadius) {
    var cx = outerRadius;
    var cy = outerRadius;
    var sweep = Math.PI / spikeCount;
    var points = [];
    var angle = 0;

    for (var i = 0; i < spikeCount; i++) {
        var x = cx + Math.cos(angle) * outerRadius;
        var y = cy + Math.sin(angle) * outerRadius;
        points.push({
            x: x,
            y: y
        });
        angle += sweep;

        x = cx + Math.cos(angle) * innerRadius;
        y = cy + Math.sin(angle) * innerRadius;
        points.push({
            x: x,
            y: y
        });
        angle += sweep;
    }
    return (points);
}





module.exports.createText = function (o, cb) {
    var options = o || {};
    var obj = new fabric.IText('Edit me...', options);
    canvas.trigger('set:scale', obj);
    canvas.trigger('object:serialize', obj);
    cb(null, obj);
};

module.exports.createCircle = function (o, cb) {
    var options = o || {};
    var obj = new fabric.Circle(options);
    canvas.trigger('set:scale', obj);
    canvas.trigger('object:serialize', obj);
    cb(null, obj);
};

module.exports.createRect = function (o, cb) {
    var options = o || {};
    var obj = new fabric.Rect(options);
    canvas.trigger('set:scale', obj);
    canvas.trigger('object:serialize', obj);
    cb(null, obj);
};

module.exports.createTriangle = function (o, cb) {
    var options = o || {};
    var obj = new fabric.Triangle(options);
    canvas.trigger('set:scale', obj);
    canvas.trigger('object:serialize', obj);
    cb(null, obj);
};

module.exports.createStar = function (o, cb) {
    var options = o || {};
    var obj = new fabric.Polygon(starPolygonPoints(5, 50, 25), options, false);
    canvas.trigger('set:scale', obj);
    canvas.trigger('object:serialize', obj);
    cb(null, obj);
};

module.exports.createHexagon = function (o, cb) {
    var options = o || {};
    var obj = new fabric.Polygon(regularPolygonPoints(6, 50), options, false);
    canvas.trigger('set:scale', obj);
    canvas.trigger('object:serialize', obj);
    cb(null, obj);
};