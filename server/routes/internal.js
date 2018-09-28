const router = require('express').Router();
const accessDB = require('../db/exampleDbFunctions');

router.get('/', (req, res) => {
  accessDB.getUsers().then(result => {
    // console.log('router DB result: \n', result);
    res.json(result);
  });
});

router.post('/savings', (req, res) => {
  accessDB
    .saveSavings(req.body.saved, req.body.goal, req.body.id)
    .then(result => {
      console.log(result);

      res.json(result);
    });
});

router.get('/savings', (req, res) => {
  console.log(req.query);

  accessDB.getSavings(req.query.id).then(result => {
    console.log(result);

    res.json(result);
  });
});

module.exports = router;
