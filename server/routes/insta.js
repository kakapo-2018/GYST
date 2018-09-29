const express = require('express');
const router = express.Router();

const instaDB = require('../db/insta');

router.get('/', (req, res) => {
  instaDB.getSpotify(req.query.id).then(result => {
    res.json(result);
  });
});

router.post('/save', (req, res) => {
  instaDB.saveSpotify(req.body.id, req.body.url).then(result => {
    res.json(result);
  });
});

module.exports = router;
