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
            initialState.push(oj);
            break;
        }
    }
    console.log(state);
    var tempstate = [];
    for(var c = 0;c<initialState.length;c++){
        if (initialState[c]._id === oj._id) {
            tempstate.push(initialState[c]);
        }
    }
    console.log(tempstate);
};
module.exports.removeObjectInState = function (o) {
    state.push({
        action: 'remove',
        object: o
    });
    console.log(state);
};

module.exports.undo = function () {
    var poppedObject = state[state.length-1];
    if(poppedObject){
        var oj = JSON.parse(poppedObject.object);        
        if(poppedObject.action == 'modify'){
            for(var i=initialState.length-1;i>=0;i--){
                if(initialState[i]._id === oj._id){
                    initialState.splice(i,1);
                    initialState.push(oj);
                }
            }
        }
    }
    if (state.length > 0) {
        return state.pop();
    }else{
        return null;
    }
}