const db = require('../config/db');

const Project = {
    findAll: () => db('projects').where({ is_deleted: false }).select('*'),
    findByProjectId: (id, trx = db) => trx('projects').where({ id, is_deleted: false }).first(),
    findByProjectIdWithUserId: (id, userId) => db('projects').where({ id, user_id: userId, is_deleted: false }).first(),
    findAllProjectsByUserId: (userId) => db('projects').where({ user_id: userId, is_deleted: false }).select('*'),
    create: (project) => db('projects').insert(project).returning('*'),
    update: (id, project) => db('projects').where({ id }).update(project).returning('*'),
    delete: (id) => db('projects').where({ id }).update({ is_deleted: true }).returning('*'),
    updateCredits: (id, newCredits) => db('projects').where({ id, is_deleted: false }).update({ credits: newCredits }).returning('*'),
};

module.exports = Project;