const router = require('express').Router();
const accessDB = require('../db/exampleDbFunctions');

router.get('/', (req, res) => {
  accessDB.getUsers().then(result => {
    console.log('router DB result: \n', result);
    res.json(result);
  });
});

module.exports = router;
