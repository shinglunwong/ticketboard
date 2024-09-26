require('dotenv').config({ path: `../.env` });

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        },
        migrations: {
            directory: '../migrations',
        },
        seeds: {
            directory: '../seeds',
        },
    },
    production: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        },
        migrations: {
            directory: '../migrations',
        },
        seeds: {
            directory: '../seeds',
        },
    },
    test: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        },
        migrations: {
            directory: '../migrations',
        },
        seeds: {
            directory: '../seeds',
        },
    },
};