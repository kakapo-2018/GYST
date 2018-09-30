exports.up = function(knex, Promise) {
    return knex.schema.createTable('weight', table => {
      table.increments('id').primary();
      table.string('userid');
      table.integer('kg');
      table.string('date')
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('weight');
  };
  