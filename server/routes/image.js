const express = require('express');
const router = express.Router();

const imageDB = require('../db/exampleDbFunctions');

router.get('/', (req, res) => {
  imageDB.getUserByID(req.query.id).then(result => {
    res.json(result);
  });
});

module.exports = router;
