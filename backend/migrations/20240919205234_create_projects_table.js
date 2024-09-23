// migrations/20230101120002_create_projects_table.js

exports.up = function (knex) {
    return knex.schema.createTable('projects', function (table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.string('name').notNullable();
        table.text('description');
        table.string('status').notNullable();
        table.integer('credits').defaultTo(0);
        table.integer('max_accumulated_credits');
        table.integer('max_credit_duration');
        table.boolean('is_deleted').defaultTo(false);
        table.timestamps(true, true);

        table.foreign('user_id').references('users.id').onDelete('CASCADE');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('projects');
};