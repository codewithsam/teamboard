const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

var userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    boards: [{
        board_id: {
            type: Schema.Types.ObjectId,
            ref: 'Whiteboard'
        },
        role: String
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

var User = mongoose.model('User', userSchema);
module.exports = User;

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByEmail = function (email, cb) {
    User.findOne({
        email: email
    }, cb);
}
module.exports.getUserById = function (id, cb) {
    User.findById(id, cb);
}

module.exports.comparePassword = function (candidatePassword, hash, cb) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        if (isMatch) {
            cb(null, isMatch);
        }
    });
}

module.exports.updateBoard = function (uid, boardid, cb) {
    User.findByIdAndUpdate(uid, {
        $push: {
            "boards": {
                board_id: boardid,
                role: "creator"
            }
        }
    }, {
        safe: true,
        new: true
    }, cb);
};

module.exports.roles = {
    creator: 'creator',
    reader: 'reader',
    writer: 'writer'
};