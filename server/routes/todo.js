const express = require('express');
const router = express.Router();

const todoDB = require('../db/todo');

router.get('/', (req, res) => {
  todoDB.getTodo(req.query.id).then(result => {
    res.json(result);
  });
});

router.post('/save', (req, res) => {
  todoDB.saveTodo(req.body.id, req.body.todo).then(result => {
    res.json(result);
  });
});

router.post('/delete', (req, res) => {
  todoDB.deleteTodo(req.body.id, req.body.user).then(result => {
    res.json(result);
  });
});

router.post('/check', (req, res) => {
  todoDB
    .checkTodo(req.body.id, req.body.user, req.body.checked)
    .then(result => {
      res.json(result);
    });
});

module.exports = router;
