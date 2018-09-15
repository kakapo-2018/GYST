const db = require('./connection')

function exampleDbFunction () {
  return db('example')
}

module.exports = {
  exampleDbFunction
}