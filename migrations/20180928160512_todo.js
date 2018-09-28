exports.up = function(knex, Promise) {
  return knex.schema.createTable('todos', table => {
    table.increments('id').primary();
    table.string('userid');
    table.string('todo');
    table.boolean('status');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('todos');
};
