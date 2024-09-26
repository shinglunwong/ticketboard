const db = require('../config/db');

const Deployment = {
    findAllByProjectId: (projectId) => db('deployments').where({ project_id: projectId, is_deleted: false }).select('*'),
    findById: (id) => db('deployments').where({ id, is_deleted: false }).first(),
    create: (ticket) => db('deployments').insert(ticket).returning('*'),
    update: (id, ticket) => db('deployments').where({ id, is_deleted: false }).update(ticket).returning('*'),
    delete: (id) => db('deployments').where({ id }).update({ is_deleted: true }).returning('*'),
};

module.exports = Deployment;