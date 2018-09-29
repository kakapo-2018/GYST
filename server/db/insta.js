const connection = require('./connection');

function getInsta(id, testDB) {
  const db = testDB || connection;
  return db('insta').where({ userid: id });
}

function saveInsta(id, url, testDB) {
  const db = testDB || connection;
  return db('insta')
    .insert({
      userid: id,
      link: url
    })
    .then(data => {
      return connection('insta').where({
        userid: id
      });
    });
}

module.exports = {
  getInsta,
  saveInsta
};
