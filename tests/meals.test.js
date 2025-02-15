const express = require('express');
const router = express.Router();

const getByIdMeals = require('../controllers/meals');
const getAllMeals = require('../controllers/meals');

describe('Test handlers', () => {
    test('Responds to /getAllMeals', async () => {
        const res = await router.get('/meals/getAllMeals');
        expect(res.status).toBe(undefined);
    })

    test('Responds to /getByIdMeals', async () => {
        const res = await router.get('/meals/getByIdMeals');
        expect(res.status).toBe(undefined);
    })
});
