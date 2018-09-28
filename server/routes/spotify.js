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

// spotify:user:cottonsnugs:playlist:6JCWxtu3J9pdFzIVeAbQ8B

/* <iframe
  src="https://open.spotify.com/embed/playlist/6JCWxtu3J9pdFzIVeAbQ8B"
  width="300"
  height="380"
  frameborder="0"
  allowtransparency="true"
  allow="encrypted-media"
/>; */
