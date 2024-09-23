const db = require('../config/db');

const Ticket = {
    // findAll: () => db('tickets').where({ is_deleted: false }).select('*'),
    findAllByProjectId: (projectId) => db('tickets').where({ project_id: projectId, is_deleted: false }).select('*'),
    findById: (id) => db('tickets').where({ id, is_deleted: false }).first(),
    create: (ticket) => db('tickets').insert(ticket).returning('*'),
    update: (id, ticket) => db('tickets').where({ id, is_deleted: false }).update(ticket).returning('*'),
    delete: (id) => db('tickets').where({ id }).update({ is_deleted: true }).returning('*'),
};

module.exports = Ticket;