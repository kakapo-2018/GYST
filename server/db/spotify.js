const connection = require('./connection');

function getSpotify(id, testDB) {
  const db = testDB || connection;
  return db('spotify').where({ userid: id });
}

function saveSpotify(id, url, testDB) {
  const db = testDB || connection;
  return db('spotify')
    .insert({
      userid: id,
      uri: url
    })
    .then(data => {
      return connection('spotify').where({
        userid: id
      });
    });
}

module.exports = {
  getSpotify,
  saveSpotify
};
