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
};
module.exports.removeObjectInState = function (o) {
    state.push({
        action: 'remove',
        object: o
    });
    console.log(state);
};

module.exports.undo = function () {
    var poppedObject = state.pop();
    if (state.length > 0) {
        console.log('what?');
        var oj = JSON.parse(poppedObject.object);
        if(state.action == 'modify'){
            for(var i=initialState.length-1;i>=0;i--){
                if(initialState[i]._id === oj._id){
                    initialState.slice(i,1);
                    initialState.push(oj);
                }
            }
        }
        return poppedObject;
    }else if(state.length === 0){
        if(!poppedObject){ return null; }
        // console.log('what?');
        // var oj = JSON.parse(poppedObject.object);
        // if(state.action == 'modify'){
        //     for(var i=0;i<initialState.length;i++){
        //         if(initialState[i]._id === oj._id){
        //             initialState[i] = oj;
        //         }
        //     }
        // }
        return poppedObject;
    }
}