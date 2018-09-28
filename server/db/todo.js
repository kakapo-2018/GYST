const connection = require('./connection');

function getTodo(id, testDB) {
  const db = testDB || connection;
  return db('todos').where({ userid: id });
}

function saveTodo(id, todo, testDB) {
  const db = testDB || connection;
  return db('todos')
    .insert({
      userid: id,
      todo: todo,
      status: true
    })
    .then(data => {
      return connection('todos').where({
        userid: id
      });
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
