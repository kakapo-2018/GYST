const express = require('express');
const router = express.Router();

const spotifyDB = require('../db/spotify');

router.get('/', (req, res) => {
  spotifyDB.getSpotify(req.query.id).then(result => {
    res.json(result);
  });
});

router.post('/save', (req, res) => {
  spotifyDB.saveSpotify(req.body.id, req.body.url).then(result => {
    res.json(result);
  });
});

module.exports = router;
