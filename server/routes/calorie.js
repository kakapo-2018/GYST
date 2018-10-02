const express = require('express');
const router = express.Router();

const calorieDB = require('../db/calories');

router.get('/:id', (req, res) => {
  calorieDB.getCalories(req.params.id).then(result => {
    res.json(result[0]);
  });
});

router.post('/save', (req, res) => {
  calorieDB.saveCalories(req.body.totalcals, req.body.id).then(result => {
    res.json(result);
  });
});

module.exports = router;
