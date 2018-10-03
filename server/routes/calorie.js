const express = require('express');
const router = express.Router();

const calorieDB = require('../db/calories');

router.get('/:id', (req, res) => {
  calorieDB.getCalories(req.params.id).then(result => {
    res.json(result[0]);
  });
});

router.post('/save', (req, res) => {
  let calories = req.body.totalcals;

  if (calories == NaN || calories == null) calories = 0;

  calorieDB.saveCalories(calories, req.body.id).then(result => {
    res.json(result);
  });
});

router.post('/delete/:id', (req, res) => {
  calorieDB.deleteCalories(req.params.id).then(result => {
    res.json(result);
  });
});

module.exports = router;
