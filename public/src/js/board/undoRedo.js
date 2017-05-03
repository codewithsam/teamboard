var list;
var state; //Array of Objects where Object = { action: 'add/modify/remove', object: fabricObject }
var canvas;
var initialState;
module.exports.initialize = function (c) {
    canvas = c;
    list = [];
    state = [];
    initialState = canvas.toJSON().objects;
}

module.exports.addObjectInState = function (o) {
    state.push({
        action: 'add',
        object: o
    });
    initialState.push(JSON.parse(o));
    console.log(state);
};
module.exports.modifyObjectInState = function (o) {
    var oj = JSON.parse(o);
    for (var j = initialState.length-1; j >= 0; j--) {
        if (initialState[j]._id === oj._id) {
            state.push({
                action: 'modify',
                object: JSON.stringify(initialState[j])
            });
            initialState[j] = oj;
            break;
        }
    }
    console.log(state);
};
module.exports.removeObjectInState = function (o) {
    state.push({
        action: 'remove',
        object: JSON.stringify(o)
    });
    initialState.push(o);
    console.log(state);
};

module.exports.undo = function () {
    console.log(state);
    var poppedObject = state[state.length-1];
    if(poppedObject){
        var oj = JSON.parse(poppedObject.object);        
        if(poppedObject.action == 'modify'){
            for(var i=initialState.length-1;i>=0;i--){
                if(initialState[i]._id === oj._id){
                    initialState[i] = oj;
                }
            }
        }
    }
    if (state.length > 0) {
        return state.pop();
    }else{
        return null;
    }
};