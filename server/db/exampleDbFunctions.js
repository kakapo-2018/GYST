const db = require('./connection');

function exampleDbFunction() {
  return db('users');
}

function userExists(username, conn) {
  //const db = conn || connection;
  console.log(username);

  return db('users')
    .count('id as n')
    .where('username', username)
    .then(count => {
      console.log(count);
      return count[0].n > 0;
    });
}

function createUser(username, password) {
  return db('users').insert({ username, hash: password });
}

module.exports = {
  exampleDbFunction,
  userExists,
  createUser
};
