var UserModel = require('./../../Models/UserSchema');
var BoardModel = require('./../../Models/WhiteboardSchema');
var url = require('url');
module.exports = function (io) {
    io.on('connection', function (socket) {
        var requestedURL = socket.request.headers.referer;
        var requestedPathName = url.parse(requestedURL).pathname;
        var boardid = requestedPathName.substr((requestedPathName.lastIndexOf('/') + 1), requestedPathName.length - (requestedPathName.lastIndexOf('/') + 1));
        console.log(boardid);
        BoardModel.getByIdWithOptions(boardid, {
            team: 1
        }, function (err, result) {
            if (err) throw err;
            if (!result.team || result.team.length < 1) {
                console.log('this whiteboard has no team, not even the creator, that means there is an error in code somewhere');
            } else {
                var flag = 0;
                result.team.forEach(function (uid) {
                    if (""+uid == ""+socket.request.user._id) {
                        flag = 1;
                        console.log("user is a part of team and is authorised");
                        socket.join(boardid);
                    }
                });
                if (!flag) {
                    console.log("Dam");
                    socket.disconnect();
                }
            }
        });
        socket.on('object:added', function (msg) {
            console.log(msg);
            socket.broadcast.to(boardid).emit('object:added', msg);
        });
        socket.on('object:modified', function (msg) {
            console.log(msg);
            socket.broadcast.to(boardid).emit('object:modified', msg);
        });
        socket.on('object:removed', function (msg) {
            console.log(msg);
            socket.broadcast.to(boardid).emit('object:removed', msg);
        });
    });
};