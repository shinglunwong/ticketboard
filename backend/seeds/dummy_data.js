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
    const hashedPassword1 = await bcrypt.hash('password123', 10); // For adminuser
    const hashedPassword2 = await bcrypt.hash('clientpass', 10);   // For clientuser
    const hashedPassword3 = await bcrypt.hash('managerpass', 10);  // For manageruser
    const hashedPassword4 = await bcrypt.hash('developerpass', 10); // For devuser
    const hashedPassword5 = await bcrypt.hash('testerpass', 10);    // For testuser

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
        {
            id: 3,
            username: 'manageruser',
            password: hashedPassword3,
            email: 'manager@example.com',
            phone: '555-555-5555',
            role: 'client',
            is_deleted: false,
        },
        {
            id: 4,
            username: 'devuser',
            password: hashedPassword4,
            email: 'developer@example.com',
            phone: '444-444-4444',
            role: 'client',
            is_deleted: false,
        },
        {
            id: 5,
            username: 'testuser',
            password: hashedPassword5,
            email: 'tester@example.com',
            phone: '333-333-3333',
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
            icon: '🍔',
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
            icon: '🍔',
            description: 'Second project description',
            status: 'planning',
            credits: 5,
            max_accumulated_credits: 50,
            max_credit_duration: 15,
            is_deleted: false,
        },
        {
            id: 3,
            user_id: 3, // 'manageruser'
            name: 'Project Gamma',
            icon: '🍔',
            description: 'Third project description',
            status: 'active',
            credits: 15,
            max_accumulated_credits: 150,
            max_credit_duration: 45,
            is_deleted: false,
        },
        {
            id: 4,
            user_id: 3,
            name: 'Project Delta',
            icon: '🍔',
            description: 'Fourth project description',
            status: 'completed',
            credits: 20,
            max_accumulated_credits: 200,
            max_credit_duration: 60,
            is_deleted: false,
        },
        {
            id: 5,
            user_id: 2,
            name: 'Project Epsilon',
            icon: '🍔',
            description: 'Fifth project description',
            status: 'on hold',
            credits: 8,
            max_accumulated_credits: 80,
            max_credit_duration: 25,
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
        {
            id: 3,
            project_id: 2,
            title: 'Beta Launch',
            description: 'Beta deployment of Project Beta',
            platform: 'Azure',
            deployed_at: new Date(),
            is_deleted: false,
        },
        {
            id: 4,
            project_id: 3,
            title: 'Gamma Release',
            description: 'Deployment of Project Gamma',
            platform: 'GCP',
            deployed_at: new Date(),
            is_deleted: false,
        },
        {
            id: 5,
            project_id: 4,
            title: 'Delta Finalization',
            description: 'Final deployment of Project Delta',
            platform: 'AWS',
            deployed_at: new Date(),
            is_deleted: false,
        },
        {
            id: 6,
            project_id: 5,
            title: 'Epsilon Pause',
            description: 'Deployment paused for Project Epsilon',
            platform: 'Azure',
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
        {
            id: 3,
            project_id: 3,
            title: 'Milestone 1',
            description: 'First milestone payment for Project Gamma',
            amount: 1500.0,
            status: 'completed',
            due_date: new Date(),
            payment_date: new Date(),
            is_deleted: false,
        },
        {
            id: 4,
            project_id: 4,
            title: 'Final Payment',
            description: 'Final payment for Project Delta',
            amount: 2000.0,
            status: 'completed',
            due_date: new Date(),
            payment_date: new Date(),
            is_deleted: false,
        },
        {
            id: 5,
            project_id: 5,
            title: 'Initial Payment',
            description: 'Initial payment for Project Epsilon',
            amount: 800.0,
            status: 'pending',
            due_date: new Date(),
            payment_date: null,
            is_deleted: false,
        },
    ];

    await knex('payments').insert(payments);

    // 5. Insert tickets
    const tickets = [
        // Project Alpha Tickets
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
            status: 'in progress',
            type: 'feature',
            is_deleted: false,
        },
        {
            id: 3,
            project_id: 1,
            title: 'Improve Security',
            description: 'Enhance security measures for user data',
            priority: 1,
            estimated_hours: 4.0,
            status: 'requested',
            type: 'task',
            is_deleted: false,
        },
        // Project Beta Tickets
        {
            id: 4,
            project_id: 2,
            title: 'Setup CI/CD Pipeline',
            description: 'Automate deployment process',
            priority: 2,
            estimated_hours: 6.0,
            status: 'pending',
            type: 'feature',
            is_deleted: false,
        },
        {
            id: 5,
            project_id: 2,
            title: 'Database Optimization',
            description: 'Optimize database queries for better performance',
            priority: 3,
            estimated_hours: 3.5,
            status: 'open',
            type: 'task',
            is_deleted: false,
        },
        // Project Gamma Tickets
        {
            id: 6,
            project_id: 3,
            title: 'Implement Authentication',
            description: 'Add user authentication and authorization',
            priority: 1,
            estimated_hours: 5.5,
            status: 'in progress',
            type: 'feature',
            is_deleted: false,
        },
        {
            id: 7,
            project_id: 3,
            title: 'UI Overhaul',
            description: 'Redesign the user interface for better UX',
            priority: 2,
            estimated_hours: 8.0,
            status: 'requested',
            type: 'task',
            is_deleted: false,
        },
        {
            id: 8,
            project_id: 3,
            title: 'Fix Payment Gateway Issue',
            description: 'Resolve errors during payment processing',
            priority: 1,
            estimated_hours: 4.5,
            status: 'open',
            type: 'bug',
            is_deleted: false,
        },
        // Project Delta Tickets
        {
            id: 9,
            project_id: 4,
            title: 'Final Testing',
            description: 'Conduct comprehensive testing before release',
            priority: 2,
            estimated_hours: 7.0,
            status: 'completed',
            type: 'task',
            is_deleted: false,
        },
        {
            id: 10,
            project_id: 4,
            title: 'Documentation',
            description: 'Prepare detailed project documentation',
            priority: 3,
            estimated_hours: 3.0,
            status: 'completed',
            type: 'task',
            is_deleted: false,
        },
        // Project Epsilon Tickets
        {
            id: 11,
            project_id: 5,
            title: 'Support Ticket Integration',
            description: 'Integrate support ticket system',
            priority: 2,
            estimated_hours: 4.0,
            status: 'on hold',
            type: 'feature',
            is_deleted: false,
        },
        {
            id: 12,
            project_id: 5,
            title: 'Fix Reporting Bug',
            description: 'Reports are not generating correctly',
            priority: 1,
            estimated_hours: 2.0,
            status: 'open',
            type: 'bug',
            is_deleted: false,
        },
    ];

    await knex('tickets').insert(tickets);

    // 6. Insert credits
    const credits = [
        // Project Alpha Credits
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
            project_id: 1,
            amount: 5,
            title: 'Referral Credits',
            description: 'Credits for referring a new client',
            is_deleted: false,
        },
        // Project Beta Credits
        {
            id: 3,
            project_id: 2,
            amount: 8,
            title: 'Performance Credits',
            description: 'Credits based on project performance',
            is_deleted: false,
        },
        {
            id: 4,
            project_id: 2,
            amount: 4,
            title: 'Early Completion Credits',
            description: 'Credits for completing tasks ahead of schedule',
            is_deleted: false,
        },
        // Project Gamma Credits
        {
            id: 5,
            project_id: 3,
            amount: 15,
            title: 'Milestone Credits',
            description: 'Credits upon reaching project milestones',
            is_deleted: false,
        },
        {
            id: 6,
            project_id: 3,
            amount: 10,
            title: 'Quality Assurance Credits',
            description: 'Credits for maintaining high-quality standards',
            is_deleted: false,
        },
        // Project Delta Credits
        {
            id: 7,
            project_id: 4,
            amount: 20,
            title: 'Final Delivery Credits',
            description: 'Credits awarded upon final project delivery',
            is_deleted: false,
        },
        {
            id: 8,
            project_id: 4,
            amount: 10,
            title: 'Client Satisfaction Credits',
            description: 'Credits based on client satisfaction surveys',
            is_deleted: false,
        },
        // Project Epsilon Credits
        {
            id: 9,
            project_id: 5,
            amount: 8,
            title: 'Integration Credits',
            description: 'Credits for integrating new systems',
            is_deleted: false,
        },
        {
            id: 10,
            project_id: 5,
            amount: 6,
            title: 'Bug Fix Credits',
            description: 'Credits for resolving critical bugs',
            is_deleted: false,
        },
    ];

    await knex('credits').insert(credits);

    const configs = [
        {
            key: 'name',
            value: 'brad',
            is_deleted: false,
        },
        {
            key: 'phone',
            value: '1234123412',
            is_deleted: false,
        },
    ]

    await knex('configs').insert(configs);
};