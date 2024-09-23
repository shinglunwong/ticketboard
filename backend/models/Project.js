const db = require('../config/db');

const Project = {
    findAll: () => db('projects').where({ is_deleted: false }).select('*'),
    findById: (id) => db('projects').where({ id, is_deleted: false }).first(),
    findProjectByUserId: (userId) => db('projects').where({ user_id: userId, is_deleted: false }).select('*'),
    create: (project) => db('projects').insert(project).returning('*'),
    update: (id, project) => db('projects').where({ id }).update(project).returning('*'),
    delete: (id) => db('projects').where({ id }).update({ is_deleted: true }).returning('*'),
};

module.exports = Project;