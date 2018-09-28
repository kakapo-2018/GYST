const express = require('express');
const router = express.Router();

const todoDB = require('../db/todo');

router.get('/', (req, res) => {
  console.log('server');
  console.log(req.query.id);

  todoDB.getTodo(req.query.id).then(result => {
    console.log(result);

    res.json(result);
  });
});

router.post('/save', (req, res) => {
  console.log(req.body);
  todoDB.saveTodo(req.body.id, req.body.todo).then(result => {
    res.json(result);
  });
});

router.post('/delete', (req, res) => {
  todoDB.deleteTodo(req.query.id).then(result => {
    console.log(result);
    if (result == undefined) {
      res.json([1, 10]);
    } else {
      res.json(result);
    }
  });
});

router.post('/check', (req, res) => {
  todoDB.checkTodo(req.query.id).then(result => {
    console.log(result);
    if (result == undefined) {
      res.json([1, 10]);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
