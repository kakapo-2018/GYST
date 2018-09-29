const connection = require('./connection');

function getWeight(id, testDB) {
  const db = testDB || connection;
  return db('weight').where({ userid: id });
}

function saveWeight(weight, date, id, testDB) {
  const db = testDB || connection;
  return db('weight')
    .insert({
      date: date,
      kg: weight,
      userid: id
    })
    .then(data => {
      return connection('weight').where({
        userid: id
      });
    });
}

module.exports = {
  getWeight,
  saveWeight
};
