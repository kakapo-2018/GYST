const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

// const cors = require('cors')

const server = express();

// server.use(cors('*'))

// server.use(bodyParser.json());

server.use(
  bodyParser.urlencoded({
    extended: true
  })
);
server.use(bodyParser.json());

server.use(express.static(path.join(__dirname, '../public')));

//API calls
server.use('/api/v1', require('./routes/routesToDB'));

server.use('/api/v1/auth', authRoutes);

server.use('/api/ext', require('./routes/routesToExternalAPI'));

module.exports = server;
