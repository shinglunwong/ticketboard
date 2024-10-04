exports.up = function (knex) {
    return knex.schema.table('projects', function (table) {
        table.string('bill_to_phone');
        table.string('bill_to_address');
        table.string('bill_to_email');
        table.string('bill_to_client_name');
    });
};

exports.down = function (knex) {
    return knex.schema.table('projects', function (table) {
        table.dropColumn('bill_to_phone');
        table.dropColumn('bill_to_address');
        table.dropColumn('bill_to_email');
        table.dropColumn('bill_to_client_name');
    });
};