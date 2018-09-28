const connection = require('./connection');

function getTodo(testDB) {
  const db = testDB || connection;
  return db('todos');
}

function saveTodo(username, testDB) {
  const db = testDB || connection;
  return db('todos')
    .count('id as n')
    .where('username', username)
    .then(count => {
      return count[0].n > 0;
    });
}

function deleteTodo(username, testDB) {
  const db = testDB || connection;
  return db('todos')
    .select()
    .where('username', username)
    .first();
}

function checkTodo(saved, goal, id, testDB) {
  const db = testDB || connection;
  return db('todos')
    .where({ id: id })
    .update({ savingGoal: goal, saved: saved })
    .then(data => {
      return db('todos').where({ id: id });
    });
}

module.exports = {
  getTodo,
  saveTodo,
  deleteTodo,
  checkTodo
};
