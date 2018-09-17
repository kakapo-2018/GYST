const connection = require('./connection');
const hash = require('../auth/hash');

function getUsers() {
  return db('users');
}

function createUser(username, password, testDB) {
  const db = testDB || connection;
  const passwordHash = hash.generate(password);
  return db('users').insert({ username, hash: passwordHash });
}

function userExists(username, testDB) {
  const db = testDB || connection;
  return db('users')
    .count('id as n')
    .where('username', username)
    .then(count => {
      console.log(count);
      return count[0].n > 0;
    });
}

function getUserByName(username, testDB) {
  const db = testDB || connection;
  return db('users')
    .select()
    .where('username', username)
    .first();
}

module.exports = {
  getUsers,
  userExists,
  createUser,
  getUserByName
};
