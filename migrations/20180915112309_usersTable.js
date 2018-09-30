exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('username');
    table.string('email');
    table.string('hash');
    table.integer('saved').defaultTo(10);
    table.integer('savingGoal').defaultTo(100);
    table.string('image');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
