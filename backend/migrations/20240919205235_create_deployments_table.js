exports.up = function (knex) {
    return knex.schema.createTable('deployments', function (table) {
        table.increments('id').primary();
        table.integer('project_id').notNullable();
        table.string('title').notNullable();
        table.text('description');
        table.string('platform');
        table.timestamp('deployed_at').notNullable();
        table.boolean('is_deleted').defaultTo(false);
        table.timestamps(true, true);

        table.foreign('project_id').references('projects.id').onDelete('CASCADE');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('deployments');
};