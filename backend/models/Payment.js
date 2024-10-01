const db = require('../config/db');

const Payment = {
    findAllByProjectId: (projectId) => db('payments').where({ project_id: projectId, is_deleted: false }).select('*'),
    findById: (id) => db('payments').where({ id, is_deleted: false }).first(),
    create: (ticket) => db('payments').insert(ticket).returning('*'),
    update: (id, ticket) => db('payments').where({ id, is_deleted: false }).update(ticket).returning('*'),
    delete: (id) => db('payments').where({ id }).update({ is_deleted: true }).returning('*'),
};

module.exports = Payment;