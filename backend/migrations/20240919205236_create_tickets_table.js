exports.up = function (knex) {
    return knex.schema.createTable('tickets', function (table) {
        table.increments('id').primary();
        table.integer('project_id').notNullable();
        table.string('title').notNullable();
        table.text('description');
        table.text('remarks');
        table.string('priority').notNullable();
        table.decimal('estimated_hours', 5, 2);
        table.string('status').notNullable();
        table.string('type').notNullable();
        table.boolean('is_deleted').defaultTo(false);
        table.timestamps(true, true);

        table.foreign('project_id').references('projects.id').onDelete('CASCADE');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('tickets');
};