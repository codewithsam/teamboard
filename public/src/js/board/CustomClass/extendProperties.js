fabric.Object.prototype.toObject = (function (toObject) {
    return function () {
        console.log(this);
        return fabric.util.object.extend(toObject.call(this), {
            _id: null,
            remote: false
        });
    };
})(fabric.Object.prototype.toObject);