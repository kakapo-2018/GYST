
exports.up = function(knex, Promise) {
    return knex.schema.createTable('example', (table) => {
        table.increments('id').primary()
        table.string('name')
        table.string('address')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('example')
};
