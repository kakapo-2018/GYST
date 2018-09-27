const router = require('express').Router();
const accessDB = require('../db/exampleDbFunctions');

router.get('/', (req, res) => {
  accessDB.getUsers().then(result => {
    console.log('router DB result: \n', result);
    res.json(result);
  });
});

router.post('/savings', (req, res) => {
  console.log(req.body);
  console.log(req);

  accessDB
    .saveSavings(req.body.saved, req.body.goal, req.body.id)
    .then(result => {
      console.log('router DB result: \n', result);
      res.json(result);
    });
  console.log('hit route');
});

module.exports = router;
