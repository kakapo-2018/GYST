const express = require('express');
const router = express.Router();

const weightDB = require('../db/weight');

router.get('/', (req, res) => {
    weightDB.getWeight(req.query.id).then(result => {
    res.json(result);
  });
});

router.post('/save', (req, res) => {
    weightDB.saveWeight(req.body.weight, req.body.date, req.body.id).then(result => {
    res.json(result);
  });
});

module.exports = router;
``