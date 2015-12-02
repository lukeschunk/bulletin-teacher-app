// Heroku sets the value of process.env.NODE_ENV
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


// Heroku sets the port, but we also need a port for development
var port = process.env.PORT || 8000;


// Including the configured express and mongoose objects
var mongoose = require('./core/server/config/mongoose'),
    express = require('./core/server/config/express');


// Let's run this!
var db = mongoose(),
    app = express();


//SOCKET

var http = require('http').Server(app);
var socketio = require('socket.io');

var io = socketio(http);

io.on('connection', function (socket) {
   console.log("a user has connected");
    socket.on('message', function (message) { // event listener
        console.log("the server just got a message!");
        io.sockets.emit('messageFromServer', message);
        });
});

// Let's listen for incoming calls!
http.listen(port, function () {
    console.log('listening on ' + port);
});
