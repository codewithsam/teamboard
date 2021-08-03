const express = require("express");
const app = express();
// process.env.NODE_ENV = 'production';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:root@smoot-shard-00-00.7hrwn.mongodb.net:27017,smoot-shard-00-01.7hrwn.mongodb.net:27017,smoot-shard-00-02.7hrwn.mongodb.net:27017/teamboard?ssl=true&replicaSet=Smoot-shard-0&authSource=admin&retryWrites=true&w=majority');
// mongoose.connect('mongodb://localhost/teamboard');
var server = require('http').Server(app);
var io = require('socket.io')(server);


//Static Folder Configuration
app.use(express.static(__dirname + '/public'));

//Set Port Number
app.set('port', (process.env.PORT || 5000));

// Middleware Configurations
require('./Configurations/Middlewares')(app,io);


//Handlebars view engine config
require('./Configurations/ViewEngine')(app);

//routers list settings
require('./router/router-list')(app);

require('./modules/sockets/socket')(io);

//Start server
server.listen(process.env.PORT || 5000, function () {
    console.log("Running server on port "+ (process.env.PORT || "5000.") );
});