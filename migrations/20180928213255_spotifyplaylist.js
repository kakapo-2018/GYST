exports.up = function(knex, Promise) {
  return knex.schema.createTable('spotify', table => {
    table.increments('id').primary();
    table.string('userid');
    table.string('uri');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('spotify');
};
