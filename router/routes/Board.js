const boardRouter = require('express').Router();
const User = require('./../../Models/UserSchema');
const BoardSchema = require('./../../Models/WhiteboardSchema');
const middlewares = require('./../../Configurations/CustomMiddlewares');


boardRouter.get('/', middlewares.isAuth, function (req, res) {
    if (req.app.get('env') === 'development') {
        if (req.isAuthenticated()) {
            return res.render('board', {
                title: "Dynamic Title"
            });
        } else {
            if (typeof req.query.email === 'undefined') {
                return res.send('Please enter email address to simulate login.');
            } else {
                User.getUserByEmail(req.query.email, function (err, user) {
                    if (err) throw err;
                    req.logIn(user, function (err) {
                        if (err) throw err;
                        res.redirect('/board');
                    });
                });
            }
        }
    }
    if (req.app.get('env') === 'production') {
        res.render('board', {
            title: "Dynamic Title"
        });
    }

});

boardRouter.get('/:id', middlewares.isAuth, function (req, res) {

    if (req.app.get('env') === 'development') {
        if (req.isAuthenticated()) {
            BoardSchema.getByIdAndPopulate(req.params.id, ['team',['data']], function (err, response) {
                if (err) throw err;
                return res.render('board', {
                    boardid: req.params.id,
                    teams: response
                });
            });
        } else {
            if (typeof req.query.email === 'undefined') {
                return res.send('Please enter email address to simulate login.');
            } else {
                User.getUserByEmail(req.query.email, function (err, user) {
                    if (err) throw err;
                    req.logIn(user, function (err) {
                        if (err) throw err;
                        res.redirect('/board/' + req.params.id);
                    });
                });
            }
        }
    }


    if (req.app.get('env') === 'production') {
        res.render('board', {
            boardid: req.params.id
        });
    }

});

boardRouter.post('/:id', middlewares.isAuthenticatedUser, function (req, res) {
    User.getUserByEmail(req.body.email, function (err, result) {
        if (err) throw err;
        var flag = false;
        for (let i = 0; i < result.boards.length; i++) {
            if (result.boards[i].board_id === parseInt(req.params.id), 10) {
                flag = true;
                break;
            }
        }
        if (flag) {
            res.send("cannot add yourself to the board");
        } else {
            res.send(result);
        }
    });
});

boardRouter.post('/:id/addteams', middlewares.isAuthenticatedUser, function (req, res) {
    var count = 0;
    req.body.teams.forEach(function (team) {
        User.getUserByEmail(team, function (err, result) {
            if (err) throw err;
            BoardSchema.addNewTeamMemberByUserId(req.params.id, result._id, function (err, result) {
                if (err) throw err;
                console.log(result);
                count++;
                if (count === req.body.teams.length) {
                    return res.json('member has been addded to team');
                }
            });
        });
    });
});

module.exports = boardRouter;