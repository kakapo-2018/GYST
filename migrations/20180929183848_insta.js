exports.up = function(knex, Promise) {
  return knex.schema.createTable('insta', table => {
    table.increments('id').primary();
    table.string('userid');
    table.string('link');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('insta');
};
