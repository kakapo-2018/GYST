const express = require('express');
const router = express.Router();

const token = require('../auth/token');
const hash = require('../auth/hash');

const {
  userExists,
  createUser,
  getUserByName
} = require('../db/exampleDbFunctions');

router.post('/register', register, token.issue);
router.post('/login', login, token.issue);

router.get('/username', token.decode, (req, res) => {
  res.json({
    username: req.user.username
  });
});

router.get('/login', token.decode, (req, res) => {
  res.json({
    username: req.user.username
  });
});

function register(req, res, next) {
  userExists(req.body.username)
    .then(exists => {
      if (exists) {
        return res.status(400).send({ message: 'User exists' });
      }
      createUser(req.body.username, req.body.password).then(() => next());
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

function login(req, res, next) {
  console.log('signIn');
  console.log(req.body);

  getUserByName(req.body.username)
    .then(user => {
      return user || invalidCredentials(res);
    })
    .then(user => {
      return user && hash.verifyUser(user.hash, req.body.password);
    })
    .then(isValid => {
      return isValid ? next() : invalidCredentials(res);
    })
    .catch(err => {
      console.log(err);
    });
}

function invalidCredentials(res) {
  res.status(400).send({
    errorType: 'INVALID_CREDENTIALS'
  });
}

module.exports = router;
