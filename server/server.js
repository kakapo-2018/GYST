const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const server = express();

server.use(
  bodyParser.urlencoded({
    extended: true
  })
);
server.use(bodyParser.json());

server.use(express.static(path.join(__dirname, '../public')));

//API calls
server.use('/api/v1', require('./routes/internal'));

server.use('/api/v1/auth', authRoutes);

server.use('/api/ext', require('./routes/external'));

module.exports = server;
