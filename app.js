const express = require("express");
const app = express();
// process.env.NODE_ENV = 'production';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://visualboard:Qwerty123@ds141474.mlab.com:41474/teamboard');
// mongoose.connect('mongodb://localhost/teamboard');
var server = require('http').Server(app);
var io = require('socket.io')(server);


//Static Folder Configuration
app.use(express.static(__dirname + '/public'));

//Set Port Number
app.set('port', (process.env.PORT || 80));

// Middleware Configurations
require('./Configurations/Middlewares')(app,io);


//Handlebars view engine config
require('./Configurations/ViewEngine')(app);

//routers list settings
require('./router/router-list')(app);

require('./modules/sockets/socket')(io);

//Start server
server.listen(app.get('port'), function () {
    console.log("Running server on port 80");
});