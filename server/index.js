require('dotenv').config();
const server = require('./server');

const port = process.env.PORT || 3000;

app = server.listen(port, function() {
  console.log('Listening on port:', port);
});

//Start listening for connections
var socket = require('socket.io');
io = socket(app);

//Log when user connects/disconnects
io.on('connection', function(socket) {
  socket.on('disconnect', function() {});
});

//On message recieved sent message out
io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    // console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

io.on('connection', function(socket) {
  socket.on('imgUrl', function(url) {
    // console.log('user image url: ' + url);
    io.emit('imgUrl', url);
  });
});
