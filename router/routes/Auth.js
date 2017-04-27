const authRouter = require('express').Router();
var User = require('./../../Models/UserSchema');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


function register(req, res) {

    req.checkBody('fullname', 'Full Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Please enter a valid email').isEmail();
    req.checkBody('pass', 'Password field cannot be blank').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.render('signup', {
            errors: errors
        });
    } else {
        var newUser = new User({
            name: req.body.fullname,
            email: req.body.email,
            password: req.body.pass
        });

        User.createUser(newUser, function (err, user) {
            if (err) throw err;
            req.flash('success_msg', 'You have been successfully registered');
            console.log('bla');
            res.redirect('/auth/login');
        });
    }
}


// Passport Middlewares

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {
        User.getUserByEmail(email, function (err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, {
                    message: "Email does not exist in database. Please type the correct Email"
                });
            }

            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: 'Invalid Password. Please type the correct password'
                    });
                }
            });
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});





// Routes


authRouter.get('/login', function (req, res) {
    if(req.app.get("env") === "development"){
        User.getUserByEmail('sam@gmail.com', function(err,user){
            if(err) throw err;
            req.logIn(user, function(err){
                if(err) throw err;
                return res.redirect('/');                
            });
            return;
        });
    }
    else{
        res.render('login', {
            
        });
    }
});
authRouter.get('/signup', function (req, res) {
    res.render('signup', {
        
    });
});


authRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/board',
    failureRedirect: '/auth/login',
    failureFlash: true
}), function (req, res) {
    res.redirect('/board');
});

authRouter.post('/signup', function (req, res) {
    register(req, res);
});




module.exports = authRouter;