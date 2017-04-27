const dashRoute = require('express').Router();
const BoardModel = require('./../../Models/WhiteboardSchema');
const UserModel = require('./../../Models/UserSchema');
const middleware = require('./../../Configurations/CustomMiddlewares');

dashRoute.get('/', middleware.isAuthenticatedUser, function (req, res) {
    /*
    //  Above middleware (isAuthenticatedUser) checks if user is authenticated, if not then go to /auth/login
    //  Auth/login will automatically log in user with email sam@gmail.com in development
    //  After that the below code will go to whiteboard schema and fetch all whiteboards created by logged in user and return it to view
    */
    var response = res;
    UserModel.getUserById(req.user._id, function (err, user) {
        if (err) throw err;
        var allboards = [];
        var promises = [];
        user.boards.map(function (obj) {
            var id = obj.board_id;
            var p = new Promise(function (resolve, reject) {
                BoardModel.getByIdWithOptions(id, {
                    data: 0
                }, function (err, res) {
                    if (err) {
                        reject();
                    } else {
                        resolve(res);
                    }
                });
            });
            promises.push(p);
        });
        Promise.all(promises).then(function (result) {
            response.render('dashboard', {
                
                whiteboardlist: result
            });
        });
    });
});
dashRoute.post('/', middleware.isAuthenticatedUser, function (req, res) {

    /*
    //  the below code will create a new whiteboard based on data sent by logged in user.
    //  Remember: all code related to database or model is in models folder in schema files
    */
    var form = JSON.parse(JSON.stringify(req.body));
    var newboard = new BoardModel({
        title: form.name,
        description: form.desc,
        team: [req.user._id]
    });
    BoardModel.createBoard(newboard, function (err) {
        if (err) throw err;
        UserModel.updateBoard(req.user._id, newboard._id, function (err, newData) {
            if (err) throw err;
            console.log("new board created");
            res.send(newboard);
        });
    });
});


module.exports = dashRoute;