exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('username');
    table.string('email');
    table.string('hash');
    table.integer('savingGoal');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
