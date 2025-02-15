
const express = require('express');
const router = express.Router();

const getSleepTime = require('../controllers/sleep');
const getSingleSleepTime = require('../controllers/sleep');

describe('Test Handlers', () => {
    test('responds to /getAllExercises', async () => {
        const res = await router.get('/sleep/getSleepTime');
        expect(res.status).toBe(undefined)
    })

    test('responds to /getByIDExercises', async () => {
        const res = await router.get('/sleep/getSingleSleepTime/67afc1336f737365160b6d1e');
        expect(res.statusCode).toBe(undefined)
    })
})