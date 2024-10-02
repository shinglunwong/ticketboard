const bcrypt = require('bcrypt');

exports.seed = async function (knex) {
    // Deletes ALL existing entries in reverse order of foreign key constraints
    await knex('credits').del();
    await knex('tickets').del();
    await knex('payments').del();
    await knex('deployments').del();
    await knex('projects').del();
    await knex('users').del();
    await knex('configs').del();

    // Hash passwords
    const hashedPassword1 = await bcrypt.hash('password123', 10);

    const users = [
        {
            id: 1,
            username: 'Brad Wong',
            password: hashedPassword1,
            email: 'admin@example.com',
            phone: '+852 98832958',
            role: 'admin',
            is_deleted: false,
        }
    ];

    await knex('users').insert(users);
};