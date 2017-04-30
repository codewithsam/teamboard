function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + s4() + s4() +
        s4() + s4();
}

module.exports.guid = guid;
module.exports.getObjectById = function (c, id) {
    var object = null;
    var objects = c.getObjects();
    for (var i = 0, len = c.size(); i < len; i++) {
        if (objects[i]._id && objects[i]._id === id) {
            object = objects[i]
            break;
        }
    }
    return object;
}