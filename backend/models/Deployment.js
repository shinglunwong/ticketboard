const db = require('../config/db');

const Deployment = {
    findAllByProjectId: (projectId) => db('deployments').where({ project_id: projectId, is_deleted: false }).select('*'),
    findById: (id) => db('deployments').where({ id, is_deleted: false }).first(),
    create: (deployment) => db('deployments').insert(deployment).returning('*'),
    update: (id, deployment) => db('deployments').where({ id, is_deleted: false }).update(deployment).returning('*'),
    delete: (id) => db('deployments').where({ id }).update({ is_deleted: true }).returning('*'),
};

module.exports = Deployment;