const mongodb = require('../data/mongodb.js');
const ObjectId = require('mongodb').ObjectId;

const getWater = async (req, res) => {
  // #swagger.tags = ['water']
  try {
    const list = await mongodb
      .getDatabase()
      .db()
      .collection('water')
      .find()
      .toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(list);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const postWater = async (req, res) => {
  // #swagger.tags = ['water']
  try {
    const water = {
      quantity: req.body.quantity,
      date: req.body.date,
    };
    await mongodb
      .getDatabase()
      .db()
      .collection('water')
      .insertOne(water);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(water);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = { getWater, postWater };