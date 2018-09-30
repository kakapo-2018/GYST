const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const spotifyRoutes = require('./routes/spotify');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');
const weightRoutes = require('./routes/weight');
const instaRoutes = require('./routes/insta');
const imageRoutes = require('./routes/image');
const server = express();
const port = process.env.PORT || 3000;
var cors = require('cors');
server.use(cors());

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

server.use('/api/v1/image', imageRoutes);

server.use('/api/v1/todo', todoRoutes);

server.use('/api/v1/spotify', spotifyRoutes);

server.use('/api/v1/weight', weightRoutes);

server.use('/api/v1/insta', instaRoutes);

server.use('/api/ext', require('./routes/external'));

server.get('/spotify', (req, res) => {});

server.get('/weight', (req, res) => {});

var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = '5da992c3166447788d05de7a2d0c1b0c'; // Your client id
var client_secret = 'c71b46dbe44c4515bfd4aaf26b8c6ace'; // Your secret
if (port == 3000) {
  var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri
} else {
  var redirect_uri = 'https://loginisshit.herokuapp.com/callback'; // Your redirect uri
}
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

server.use(express.static(__dirname + '/public')).use(cookieParser());

server.get('/login', function(req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your serverlication requests authorization
  var scope =
    'user-read-private user-read-email user-modify-playback-state user-read-playback-state';
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })
  );
});

server.get('/callback', function(req, res) {
  // your serverlication requests refresh and access tokens
  // after checking the state parameter
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      '/#' +
        querystring.stringify({
          error: 'state_mismatch'
        })
    );
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        Authorization:
          'Basic ' +
          new Buffer(client_id + ':' + client_secret).toString('base64')
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { Authorization: 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {});

        //we can also pass the token to the browser to make requests from there
        res.redirect(
          'http://localhost:3000/#' +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            })
        );
      } else {
        res.redirect(
          '/#' +
            querystring.stringify({
              error: 'invalid_token'
            })
        );
      }
    });
  }
});

server.get('/refresh_token', function(req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(client_id + ':' + client_secret).toString('base64')
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token
      });
    }
  });
});

module.exports = server;
