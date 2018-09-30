require('dotenv').config();
const server = require('./server');

const port = process.env.PORT || 3000;

app = server.listen(port, function() {
  console.log('Listening on port:', port);
});

var socket = require('socket.io');
io = socket(app);

// io.on('connection', socket => {
//   console.log(socket.id);
// });

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});
