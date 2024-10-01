const db = require('../config/db');

const Credit = {
    findByProjectId: (id) => db('credits').where({ project_id: id, is_deleted: false }).select('*'),
    create: (credit, trx = db) => trx('credits').insert(credit).returning('*'),
};

module.exports = Credit;