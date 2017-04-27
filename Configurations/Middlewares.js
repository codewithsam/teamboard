const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passportSocketIo = require("passport.socketio");
const MongoStore = require('connect-mongo')(session);
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

module.exports = function (app, io) {
    // Body parser middleware for Forms
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    //cookie middleware
    app.use(cookieParser());

    var mongoStore = new MongoStore({
        mongooseConnection: mongoose.connection
    });

    //session middleware
    app.use(session({
        store: mongoStore,
        secret: 'ThisisSome@password/String%123',
        saveUninitialized: true,
        resave: true
    }));

    io.use(passportSocketIo.authorize({ //configure socket.io
        cookieParser: cookieParser,
        secret: 'ThisisSome@password/String%123', // make sure it's the same than the one you gave to express
        store: mongoStore,
        success: onAuthorizeSuccess, // *optional* callback on success
        fail: onAuthorizeFail, // *optional* callback on fail/error
    }));

    function onAuthorizeSuccess(data, accept) {
        console.log('User is authorised');
        accept(); //Let the user through
    }

    function onAuthorizeFail(data, message, error, accept) {
        if (error) accept(new Error(message));
        console.log('User is authorised:', message);
        accept(null, false);
    }

    //Passport middleware for user authentication
    app.use(passport.initialize());
    app.use(passport.session());



    //express form validation
    app.use(expressValidator({
        errorFormatter: function (param, msg, value) {
            var namespace = param.split('.'),
                root = namespace.shift(),
                formParam = root;

            while (namespace.length) {
                formParam += '[' + namespace.shift() + ']';
            }
            return {
                param: formParam,
                msg: msg,
                value: value
            };
        }
    }));

    //flash messages
    app.use(flash());

    //Global variables
    app.use(function (req, res, next) {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.err_msg = req.flash('err_msg');
        res.locals.error = req.flash('error');
        res.locals.user = req.user || null;
        next();
    });
}