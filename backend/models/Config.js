const db = require('../config/db');

const Credit = {
    findAll: () => db('configs').where({ is_deleted: false }).select('*'),
    findById: (id) => db('configs').where({ id }).select('*').first(),
    create: (credit) => db('configs').insert(credit).returning('*'),
    update: (id, credit) => db('configs').where({ id }).update(credit).returning('*'),
    delete: (id) => db('configs').where({ id }).update({ is_deleted: true }).returning('*'),
};

module.exports = Credit;