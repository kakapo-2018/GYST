const router = require('express').Router();
const accessDB = require('../db/exampleDbFunctions');

router.get('/', (req, res) => {
  accessDB.getUsers().then(result => {
    res.json(result);
  });
});

router.post('/savings', (req, res) => {
  accessDB
    .saveSavings(req.body.saved, req.body.goal, req.body.id)
    .then(result => {
      res.json(result);
    });
});

router.get('/savings', (req, res) => {
  accessDB.getSavings(req.query.id).then(result => {
    res.json(result);
  });
});

module.exports = router;
