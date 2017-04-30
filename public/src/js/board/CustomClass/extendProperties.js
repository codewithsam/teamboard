var util = require('./../../Utility/util');

fabric.Object.prototype.toObject = (function (toObject) {
    return function (properties) {
        return fabric.util.object.extend(toObject.call(this,properties), {
            _id: this._id || null,
            remote: this.remote || false
        });
    };
})(fabric.Object.prototype.toObject);