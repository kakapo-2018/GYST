const express = require('express');
const token = require('../auth/token');
const verifyJwt = require('express-jwt');
const router = express.Router();

const { userExists, createUser } = require('../db/exampleDbFunctions');

router.post('/register', register, token.issue);

router.get('/username', token.decode, (req, res) => {
  console.log('ding');

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

// router.get(
//   '/user',
//   verifyJwt({ secret: process.env.JWT_SECRET }),
//   user,
//   userError
// );

module.exports = router;
