const request = require('supertest');
const mongoose = require('mongoose');
require('dotenv').config();
const app = require('../app');
describe('Test the root path', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URL);
});

afterEach(async () => {
    await mongoose.connection.close();
});
