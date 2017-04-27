var  UserModel = require('./../../Models/UserSchema');
var BoardModel = require('./../../Models/WhiteboardSchema');
var url = require('url');
module.exports = function (io) {
    io.on('connection', function (socket) {
        var requestedURL = socket.request.headers.referer;
        var requestedPathName = url.parse(requestedURL).pathname;
        var boardid = requestedPathName.substr( (requestedPathName.lastIndexOf('/')+1), requestedPathName.length - (requestedPathName.lastIndexOf('/')+1));
    
});
};