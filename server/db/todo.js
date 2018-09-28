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
      status: false
    })
    .then(data => {
      return connection('todos').where({
        userid: id
      });
    });
}

function deleteTodo(id, user, testDB) {
  const db = testDB || connection;
  return db('todos')
    .select()
    .where('id', id)
    .del()
    .then(data => {
      return connection('todos').where({
        userid: user
      });
    });
}

function checkTodo(id, user, checked, testDB) {
  const db = testDB || connection;
  if (checked == 0) {
    checked = 1;
  } else if (checked == 1) {
    checked = 0;
  }
  return db('todos')
    .where({ id: id })
    .update({ status: checked })
    .then(data => {
      return db('todos').where({ userid: user });
    });
}

module.exports = {
  getTodo,
  saveTodo,
  deleteTodo,
  checkTodo
};
