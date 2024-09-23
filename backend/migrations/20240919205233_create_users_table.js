exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id').primary();
        table.string('username').notNullable().unique();
        table.string('password').notNullable();
        table.string('email').notNullable().unique();
        table.string('phone');
        table
            .enu('role', ['admin', 'client'], {
                useNative: true,
                enumName: 'user_role',
                existingType: true,
            })
            .notNullable();
        table.boolean('is_deleted').defaultTo(false);
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};