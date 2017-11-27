// app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/Tone'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});


//Socket Listener
io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
        client.emit('welcomeMsg', 'Connected to socket')
    });
    client.on('messages', function(data) {
           client.emit('broad', data);
           client.broadcast.emit('broad',data);
    });
    client.on('buttonPressed', function(data) {
        console.log("server pressed" + data);
        client.broadcast.emit('press', data);
    });
    client.on('buttonReleased', function(data){
        console.log("server released" + data);
      client.broadcast.emit('release', data);
    })


});

server.listen(4200);


/*
  // sending to the client
  socket.emit('hello', 'can you hear me?', 1, 2, 'abc');

  // sending to all clients except sender
  socket.broadcast.emit('broadcast', 'hello friends!');

  // sending to all clients in 'game' room except sender
  socket.to('game').emit('nice game', "let's play a game");

  // sending to all clients in 'game1' and/or in 'game2' room, except sender
  socket.to('game1').to('game2').emit('nice game', "let's play a game (too)");

  // sending to all clients in 'game' room, including sender
  io.in('game').emit('big-announcement', 'the game will start soon');

  // sending to all clients in namespace 'myNamespace', including sender
  io.of('myNamespace').emit('bigger-announcement', 'the tournament will start soon');

  // sending to individual socketid (private message)
  socket.to(<socketid>).emit('hey', 'I just met you');

  // sending with acknowledgement
  socket.emit('question', 'do you think so?', function (answer) {});

  // sending without compression
  socket.compress(false).emit('uncompressed', "that's rough");

  // sending a message that might be dropped if the client is not ready to receive messages
  socket.volatile.emit('maybe', 'do you really need it?');

  // sending to all clients on this node (when using multiple nodes)
  io.local.emit('hi', 'my lovely babies');


  */
