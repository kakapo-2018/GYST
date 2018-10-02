const connection = require('./connection');

function getCalories(id, testDB) {
  const db = testDB || connection;
  return db('calories').where({ userid: id });
}

function saveCalories(cals, id, testDB) {
  const db = testDB || connection;

  return db('calories')
    .where('userid', id)
    .then(data => {
      //If user exists update
      if (data.length > 0) {
        return db('calories').update({
          userid: id,
          calories: cals
        });
      }
      //Else create new entry
      else {
        return db('calories').insert({
          userid: id,
          calories: cals
        });
      }
    })
    .then(data => {
      return connection('calories').where({
        userid: id
      });
    });
}

module.exports = {
  getCalories,
  saveCalories
};
