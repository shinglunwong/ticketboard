const db = require('../config/db');

const User = {
    findAllUsers: () => db('users').where({ is_deleted: false }).select(['id', 'username', 'email', 'phone', 'role']),
    findByEmail: (email) => db('users').where({ email }).first(),
    findById: (id) => db('users').where({ id, is_deleted: false }).first().select(['id', 'username', 'email', 'phone', 'role']),
    create: (user) => db('users').insert(user).returning('*'),
    update: (id, user) => db('users').where({ id }).update(user).returning('*'),
    delete: (id) => db('users').where({ id }).update({ is_deleted: true }),
    findAllClients: () => db('users').where({ role: 'client', is_deleted: false }).select('*'),
};

module.exports = User;