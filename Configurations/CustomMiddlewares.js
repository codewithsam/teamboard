module.exports.isAuth = function (req, res, next) {
    // if(req.app.get('env') === "development"){
    //     return next();
    // }
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error_msg', 'You are not logged in. Please enter your credentials');
        res.redirect('/auth/login');
    }
};
module.exports.isAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        console.log("not logged in!!");
        res.redirect('/auth/login');
    }
};