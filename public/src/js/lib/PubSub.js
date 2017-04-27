var events = [];

function on(e,fn){
    if(!events[e]){
        events[e] = [];
    }
    events[e].push(fn);
}
function off(e,fn){
    if(events[e]){
        events[e].forEach(function(f,i){
            if(f === fn){
                events[e].splice(i,1);
            }
        });
    }
}

function emit(e,data){
    if(events[e]){
        events[e].forEach(function(fn,i){
            fn(data);
        });
    }
}

module.exports = {
    $on: on,
    $off: off,
    add: on,
    remove: off,
    $emit: emit,
    subscribe: on,
    publish: emit,
    unsubscribe: off
}