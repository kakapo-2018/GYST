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
  console.log(id, user, checked);

  //   return db('todos')
  //     .where({ id: id })
  //     .update({ savingGoal: goal, saved: saved })
  //     .then(data => {
  //       return db('todos').where({ id: id });
  //     });
}

module.exports = {
  getTodo,
  saveTodo,
  deleteTodo,
  checkTodo
};
