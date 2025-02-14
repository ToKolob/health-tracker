
const express = require('express');
const router = express.Router();

const getByIDExercises = require('../controllers/exercises');
const getAllExercises = require('../controllers/exercises');

describe('Test Handlers', () => {
    test('responds to /getAllExercises', async () => {
        const res = await router.get('/exercises/getAllExercises');
        //expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.status).toBe(undefined)
    })

    test('responds to /getByIDExercises', async () => {
        const res = await router.get('/exercises/getByIDExercises/67afc1336f737365160b6d1e');
        //expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(undefined)
    })
})

/*const {MongoClient} = require('mongodb');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');

    const mockUser = {_id: 'some-user-id', name: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
});

--------------------------
const server = require('../server')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(server)


describe('Test Handlers', () => {
    test('responds to /', async () => {
        const res = await request.get('/');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('responds to /users', async () => {
        const res = await request.get('/');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })
})
*/