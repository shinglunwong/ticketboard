
const request = require('supertest');
const app = require('../app.js');

describe('Auth Endpoints', () => {
    it('should login a user and return a token', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'admin@example.com',
                password: 'password123'
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    // Add more tests as needed
});