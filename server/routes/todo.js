const express = require('express');
const router = express.Router();

const todoDB = require('../db/todo');

router.get('/', (req, res) => {
  accessDB.getTodo().then(result => {
    res.json(result);
  });
});

router.post('/save', (req, res) => {
  accessDB.saveTodo(req.body.saved, req.body.goal, req.body.id).then(result => {
    res.json(result);
  });
});

router.post('/delete', (req, res) => {
  accessDB.deleteTodo(req.query.id).then(result => {
    console.log(result);
    if (result == undefined) {
      res.json([1, 10]);
    } else {
      res.json(result);
    }
  });
});

router.post('/check', (req, res) => {
  accessDB.checkTodo(req.query.id).then(result => {
    console.log(result);
    if (result == undefined) {
      res.json([1, 10]);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
