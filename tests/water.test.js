const express = require('express');
const router = express.Router();

const getSingleWaterIntake = require('../controllers/water');
const getWaterIntake = require('../controllers/water');

describe('Test handlers', () => {
    test('Responds to /getWaterIntake', async () => {
        const res = await router.get('/water/getWaterIntake');
        expect(res.status).toBe(undefined);
    })

    test('Responds to /getSingleWaterIntake', async () => {
        const res = await router.get('/meals/getSingleWaterIntake');
        expect(res.status).toBe(undefined);
    })
});
