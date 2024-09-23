const bcrypt = require('bcrypt');

exports.seed = async function (knex) {
    // Deletes ALL existing entries in reverse order of foreign key constraints
    await knex('credits').del();
    await knex('tickets').del();
    await knex('payments').del();
    await knex('deployments').del();
    await knex('projects').del();
    await knex('users').del();

    // Hash passwords
    const hashedPassword1 = await bcrypt.hash('password123', 10); // For adminuser
    const hashedPassword2 = await bcrypt.hash('clientpass', 10);   // For clientuser

    // Inserts seed entries
    // 1. Insert users
    const users = [
        {
            id: 1,
            username: 'adminuser',
            password: hashedPassword1,
            email: 'admin@example.com',
            phone: '123-456-7890',
            role: 'admin',
            is_deleted: false,
        },
        {
            id: 2,
            username: 'clientuser',
            password: hashedPassword2,
            email: 'client@example.com',
            phone: '098-765-4321',
            role: 'client',
            is_deleted: false,
        },
    ];

    await knex('users').insert(users);

    // 2. Insert projects
    const projects = [
        {
            id: 1,
            user_id: 2, // 'clientuser'
            name: 'Project Alpha',
            description: 'First project description',
            status: 'active',
            credits: 10,
            max_accumulated_credits: 100,
            max_credit_duration: 30, // days
            is_deleted: false,
        },
        {
            id: 2,
            user_id: 2,
            name: 'Project Beta',
            description: 'Second project description',
            status: 'planning',
            credits: 5,
            max_accumulated_credits: 50,
            max_credit_duration: 15,
            is_deleted: false,
        },
    ];

    await knex('projects').insert(projects);

    // 3. Insert deployments
    const deployments = [
        {
            id: 1,
            project_id: 1,
            title: 'Initial Release',
            description: 'First deployment of Project Alpha',
            platform: 'AWS',
            deployed_at: new Date(),
            is_deleted: false,
        },
        {
            id: 2,
            project_id: 1,
            title: 'Version 1.1',
            description: 'Update to Project Alpha',
            platform: 'AWS',
            deployed_at: new Date(),
            is_deleted: false,
        },
    ];

    await knex('deployments').insert(deployments);

    // 4. Insert payments
    const payments = [
        {
            id: 1,
            project_id: 1,
            title: 'Initial Payment',
            description: 'Payment for Project Alpha',
            amount: 1000.0,
            status: 'completed',
            due_date: new Date(),
            payment_date: new Date(),
            is_deleted: false,
        },
        {
            id: 2,
            project_id: 2,
            title: 'Down Payment',
            description: 'Initial payment for Project Beta',
            amount: 500.0,
            status: 'pending',
            due_date: new Date(),
            payment_date: null,
            is_deleted: false,
        },
    ];

    await knex('payments').insert(payments);

    // 5. Insert tickets
    const tickets = [
        {
            id: 1,
            project_id: 1,
            title: 'Fix Login Bug',
            description: 'Users cannot log in under certain conditions',
            priority: 1,
            estimated_hours: 2.5,
            status: 'open',
            type: 'bug',
            is_deleted: false,
        },
        {
            id: 2,
            project_id: 1,
            title: 'Add Profile Feature',
            description: 'Implement user profile page',
            priority: 2,
            estimated_hours: 5.0,
            status: 'in_progress',
            type: 'feature',
            is_deleted: false,
        },
    ];

    await knex('tickets').insert(tickets);

    // 6. Insert credits
    const credits = [
        {
            id: 1,
            project_id: 1,
            amount: 10,
            title: 'Bonus Credits',
            description: 'Additional credits for early payment',
            is_deleted: false,
        },
        {
            id: 2,
            project_id: 2,
            amount: 5,
            title: 'Referral Credits',
            description: 'Credits for referring a new client',
            is_deleted: false,
        },
    ];

    await knex('credits').insert(credits);
};