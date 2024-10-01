exports.up = function (knex) {
    return knex.schema.createTable('configs', function (table) {
        table.increments('id').primary();
        table.string('key').notNullable();
        table.string('value').notNullable();
        table.boolean('is_deleted').defaultTo(false);
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('configs');
};