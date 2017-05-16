const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('./UserSchema');

var BoardSchema = new Schema({
    title: String,
    description: String,
    data: [{
        guid: String,
        data: {},
        created_by: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    team: [{
        "type": Schema.Types.ObjectId,
        "ref": "User"
    }],
    chat: [{
        message: String,
        created_by: {
            "type": Schema.Types.ObjectId,
            ref: 'User'
        },
        created_at: {
            type: Date,
            default: Date.now
        }

    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

var Whiteboard = mongoose.model('Whiteboard', BoardSchema);
module.exports = Whiteboard;

module.exports.createBoard = function (board, cb) {
    board.save(cb);
};

module.exports.getById = function (id, cb) {
    Whiteboard.findById(id, cb);
}

module.exports.getByIdWithOptions = function (id, opt, cb) {
    Whiteboard.findById(id, opt, cb);
};
module.exports.getByIdAndPopulate = function (id, opt, cb) {
    Whiteboard.findById(id).populate(opt[0]).populate(opt[1]).lean().exec(function (err, player) {
        cb(err, JSON.stringify(player));
    });
};
module.exports.addNewTeamMemberByUserId = function (boardid, userid, cb) {
    console.log(boardid);
    Whiteboard.update({
        _id: boardid
    }, {
        $push: {
            "team": userid
        }
    }, {
        safe: true,
        upsert: true
    }, cb);
};
module.exports.addNewDataFromSocket = function (boardid, msg, cb) {
    if (!msg.id || !msg.data || !msg.by) {
        return;
    }
    console.log('adding');
    Whiteboard.update({
        _id: boardid
    }, {
        $push: {
            data: {
                "guid": msg.id,
                "data": msg.data,
                "created_by": msg.by
            }
        }
    }, {
        safe: true,
        upsert: true
    }, cb);
};

module.exports.modifyDataFromSocket = function (boardid, msg, cb) {
    if (!msg.id || !msg.data) {
        return;
    }
    Whiteboard.update({
        'data.guid': msg.id
    }, {
        $set: {
            'data.$.data': msg.data
        }
    }, cb);
};
module.exports.deleteDataFromSocket = function (boardid, id, cb) {
    if (!id) {
        return;
    }
    console.log(id);
    Whiteboard.update({
        'data.guid': id
    }, {
        $pull: {
            'data': {
                'guid': id
            }
        }
    }, cb);
};
module.exports.addToChat = function (boardid, data, cb) {
    var msg = data.msg || '';
    var uid = data._id || undefined;
    if (!boardid || !uid) {
        console.log(boardid, uid);
        console.log('what');
        cb(new Error("Please specify board id and user id"));
        return;
    }
    Whiteboard.update({
        _id: boardid
    }, {
        $push: {
            chat: {
                'message': msg,
                'created_by': uid
            }
        }
    }, {
        safe: true,
        upsert: true
    }, cb);
};