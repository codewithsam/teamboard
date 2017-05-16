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
            var message = {
                id: msg._id,
                data: msg,
                by: socket.request.user._id
            };
            BoardModel.addNewDataFromSocket(boardid, message, function(err, result){
                console.log(result);
            });
            socket.broadcast.to(boardid).emit('object:added', msg);
        });
        socket.on('object:modified', function (msg) {
            var message = {
                id: msg._id,
                data: msg,
                by: socket.request.user._id
            };
            BoardModel.modifyDataFromSocket(boardid,message, function(err, result){
                if(err) throw err;
                console.log(result);
            });

            socket.broadcast.to(boardid).emit('object:modified', msg);
        });
        socket.on('object:removed', function (msg) {
            BoardModel.deleteDataFromSocket(boardid,msg,function(err,result){
                if(err) throw err;
                console.log(result);
            })
            socket.broadcast.to(boardid).emit('object:removed', msg);
        });
        socket.on('chat:send', function(msg){

            BoardModel.addToChat(boardid,msg, function(err, data){
                if(err) throw err;
                console.log(data);
            });

            UserModel.getUserById(msg._id, function(err,data){
                if(err) throw err;
                var m = {};
                m.name = data.name || '';
                m._id = data._id || '';
                m.email = data._email || '';
                m.img = data.img || '';
                m.msg = msg.msg || '';
                socket.broadcast.to(boardid).emit('chat:send', m);
            });
        });
    });
};