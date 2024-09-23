exports.up = function (knex) {
    return knex.schema.createTable('credits', function (table) {
        table.increments('id').primary();
        table.integer('project_id').unsigned().notNullable();
        table.integer('amount').notNullable();
        table.string('title').notNullable();
        table.text('description');
        table.boolean('is_deleted').defaultTo(false);
        table.timestamps(true, true);

        table.foreign('project_id').references('projects.id').onDelete('CASCADE');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('credits');
};