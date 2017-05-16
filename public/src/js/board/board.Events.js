var fabricSettings = require('./../configurations/fabric.configure');
var socket = require('./../socket').getInstance();
var util = require('./../Utility/util');
var UndoRedo = require('./undoRedo');
var object_json = require('./../object-json/object.json');


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
        if (!fabricObject.dustbin) UndoRedo.addObjectInState(JSON.stringify(fabricObject));
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
        if (e.target.name == "p0" || e.target.name == "p1" || e.target.name == "p2") {
            onPathMoving(e, canvas);
        }
        var fabricObject = e.target;
        // console.log(e.target);
        sessionStorage.removeItem(fabricObject._id);
        sessionStorage.setItem(fabricObject._id, JSON.stringify(fabricObject));
        console.log("Object changed");
        UndoRedo.modifyObjectInState(JSON.stringify(fabricObject));
        socket.emit('object:modified', fabricObject);
        resetPropertyDialog(e);
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
        if (!e.target.dustbin) UndoRedo.removeObjectInState(e.target);
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

    canvas.on('object:selected', resetPropertyDialog);
    canvas.on('selection:cleared', function (e) {
        var proplist = $('.property-list ul');
        var valuelist = $('.value-list ul');
        proplist.html('');
        valuelist.html('');
        var textToInsert = [];
        var propToInsert = [];
    });
    canvas.on('chat:send', function (e) {
        if(!e.img){ e.img = 'Letter-A-icon.png'; }
        var template = '<li class="chat-right"><img src="/img/alphabet/' + e.img + '" alt=""><div><span>' + e.name + '</span><p>' + e.msg + '</p></div></li>';
        $('ul.messages').append(template);
        socket.emit('chat:send', e);
    });
    socket.on('chat:send', function (msg) {
        if(!msg.img){ msg.img = 'Letter-A-icon.png'; }        
        var template = '<li class="chat-left"><img src="/img/alphabet/' + msg.img + '" alt=""><div><span>' + msg.name + '</span><p>' + msg.msg + '</p></div></li>';
        $('ul.messages').append(template);
    });
};


function resetPropertyDialog(e) {
    // console.log(e.target);
    var proplist = $('.property-list ul');
    var valuelist = $('.value-list ul');
    proplist.html('');
    valuelist.html('');
    var textToInsert = [];
    var propToInsert = [];
    if (e.target.get('fill').length === 6) {
        e.target.set('fill', e.target.get('fill') + "0");
    }
    var selectedObject = e.target.toObject();
    for (var prop in selectedObject) {
        // console.log(prop,selectedObject[prop]);
        var propAttr = object_json[prop];
        if (propAttr) {
            if (propAttr === 'cstring') {
                if (!e.target.get(prop)) {
                    textToInsert.push('<li><input class="objectChanger" data-prop="' + prop + '" class="cstring" type="text" value="null" readonly disabled=true/></li>');
                } else {
                    textToInsert.push('<li><input class="objectChanger" data-prop="' + prop + '" class="cstring" type="text" value="' + e.target.get(prop) + '" readonly disabled=true/></li>');

                }
            }
            if (propAttr === 'string') {
                if (!e.target.get(prop)) {
                    textToInsert.push('<li><input class="objectChanger" data-prop="' + prop + '" type="text" value="null" /></li>');
                } else {
                    textToInsert.push('<li><input class="objectChanger" data-prop="' + prop + '" type="text" value="' + e.target.get(prop) + '" /></li>');

                }
            }
            if (propAttr === 'number') {
                if (!e.target.get(prop)) {
                    textToInsert.push('<li><input class="objectChanger" data-prop="' + prop + '" type="number" value="0" /></li>');
                } else {

                    textToInsert.push('<li><input class="objectChanger" data-prop="' + prop + '" type="number"  value="' + e.target.get(prop) + '" /></li>');
                }
            }
            if (propAttr === 'color') {
                if (!e.target.get(prop)) {
                    textToInsert.push('<li><input class="objectChanger" data-prop="' + prop + '" type="color" />NULL</li>');
                } else {
                    if (e.target.get(prop).length === 6) {
                        e.target.set(prop, e.target.get(prop) + "0");
                    }
                    textToInsert.push('<li><input class="objectChanger" data-prop="' + prop + '" type="color" value="' + e.target.get(prop) + '" /></li>');

                }

            }
            if (propAttr === 'boolean') {
                var obb = propAttr;
                textToInsert.push('<li>');
                textToInsert.push('<select  class="objectChanger" data-prop="' + prop + '">');
                if (e.target.get(prop) === true) {
                    textToInsert.push('<option value="true" selected>true</option>');
                    textToInsert.push('<option value="false">false</option>');
                } else {
                    textToInsert.push('<option value="true">true</option>');
                    textToInsert.push('<option value="false" selected>false</option>');
                }
                textToInsert.push('</select>');
                textToInsert.push('</li>');
            }
            if (typeof propAttr === 'object') {
                var ob = propAttr;
                textToInsert.push('<li>');
                textToInsert.push('<select  class="objectChanger" data-prop="' + prop + '">');
                for (var i = 0; i < ob.length; i++) {
                    if (ob[i] === e.target.get(prop)) {
                        textToInsert.push('<option value="' + ob[i] + '" selected>' + ob[i] + '</option>');
                    } else {
                        textToInsert.push('<option value="' + ob[i] + '">' + ob[i] + '</option>');
                    }
                }
                textToInsert.push('</select>');
                textToInsert.push('</li>');
            }
            propToInsert.push('<li>' + prop + '</li>');
        }
    }
    proplist.append(propToInsert.join(''));
    valuelist.append(textToInsert.join(''));
}



function onPathMoving(e, canvas) {
    var path = [];
    var p = e.target;
    var objs = canvas.getObjects();
    var curveLine;
    for (var i = 0; i < objs.length; i++) {
        if (objs[i]._id === p._relid) {
            curveLine = objs[i];
        }
    }
    if (p.name == "p0") {
        curveLine.path[0][1] = p.left;
        curveLine.path[0][2] = p.top;
    }
    if (p.name == "p2") {
        curveLine.path[1][3] = p.left;
        curveLine.path[1][4] = p.top;
    }
    if (p.name == "p1") {
        curveLine.path[1][1] = p.left;
        curveLine.path[1][2] = p.top;
    }
    var options = curveLine.toObject();
    canvas.remove(curveLine);
    console.info(options);
    var newCurve = new fabric.Path(curveLine.path, {
        fill: options.fill,
        stroke: options.stroke,
        strokeWidth: options.strokeWidth,
        _id: options._id,
        selectable: false,
        hasControls: false
    });
    newCurve.selectable = false;
    newCurve.hasControls = false;
    canvas.add(newCurve);
    canvas.renderAll();

    // var p = e.target;
    // if (p.name == "p0" || p.name == "p2") {
    //     if (p.line1) {
    //         p.line1.path[0][1] = p.left;
    //         p.line1.path[0][2] = p.top;
    //     } else if (p.line3) {
    //         p.line3.path[1][3] = p.left;
    //         p.line3.path[1][4] = p.top;
    //     }
    // } else if (p.name == "p1") {
    //     if (p.line2) {
    //         p.line2.path[1][1] = p.left;
    //         p.line2.path[1][2] = p.top;
    //     }
    // } else if (p.name == "p0" || p.name == "p2") {
    //     p.line1 && p.line1.set({
    //         'x2': p.left,
    //         'y2': p.top
    //     });
    //     p.line2 && p.line2.set({
    //         'x1': p.left,
    //         'y1': p.top
    //     });
    //     p.line3 && p.line3.set({
    //         'x1': p.left,
    //         'y1': p.top
    //     });
    //     p.line4 && p.line4.set({
    //         'x1': p.left,
    //         'y1': p.top
    //     });
    // }
    // var options = p.toObject();
    // canvas.remove(p);

    // var line = new fabric.Path(p.path, options);
    // canvas.add(line);







}