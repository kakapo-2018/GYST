exports.up = function(knex, Promise) {
  return knex.schema.createTable('calories', table => {
    table.increments('id').primary();
    table.string('userid');
    table.integer('calories').defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('calories');
};
