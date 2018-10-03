const connection = require('./connection');

function getCalories(id, testDB) {
  const db = testDB || connection;
  return db('calories').where({ userid: id });
}

function deleteCalories(id, testDB) {
  console.log(id);
  const db = testDB || connection;
  return db('calories')
    .where('userid', id)
    .then(data => {
      //If user exists update
      if (data.length > 0) {
        return db('calories')
          .where('userid', id)
          .update({
            userid: id,
            calories: 0
          });
      }
      //Else create new entry
      else {
        console.log("user calories don't exist");
      }
    })
    .then(data => {
      return connection('calories')
        .where({
          userid: id
        })
        .first();
    });
}

function saveCalories(cals, id, testDB) {
  const db = testDB || connection;
  console.log(cals);

  return db('calories')
    .where('userid', id)
    .then(data => {
      //If user exists update
      if (data.length > 0) {
        return db('calories')
          .where('userid', id)
          .update({
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
      return connection('calories')
        .where({
          userid: id
        })
        .first();
    });
}

module.exports = {
  getCalories,
  saveCalories,
  deleteCalories
};
