exports.up = function (knex) {
    return knex.schema.createTable('payments', function (table) {
        table.increments('id').primary();
        table.integer('project_id').unsigned().notNullable();
        table.string('title').notNullable();
        table.text('description');
        table.decimal('amount', 10, 2).notNullable();
        table.string('status').notNullable();
        table.date('due_date');
        table.date('payment_date');
        table.boolean('is_deleted').defaultTo(false);
        table.timestamps(true, true);

        table.foreign('project_id').references('projects.id').onDelete('CASCADE');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('payments');
};