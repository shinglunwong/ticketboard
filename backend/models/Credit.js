const db = require('../config/db');

const Credit = {
    findByProjectId: (id) => db('credits').where({ project_id: id, is_deleted: false }).first(),
    create: (credit) => db('credits').insert(credit).returning('*'),
    // update: (id, credit) => db('credits').where({ id }).update(credit).returning('*'),
    // delete: (id) => db('credits').where({ id }).update({ is_deleted: true }).returning('*'),
};

module.exports = Credit;


// table.integer('project_id').unsigned().notNullable();
// table.integer('amount').notNullable();
// table.string('title').notNullable();
// table.text('description');