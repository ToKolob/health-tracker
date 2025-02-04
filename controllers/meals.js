const mongodb = require('../data/mongodb.js');
const ObjectId = require('mongodb').ObjectId;

const getMeals = async (req, res) => {
  // #swagger.tags = ['meals']
  try {
    const list = await mongodb
    .getDatabase()
    .db()
    .collection('meals')
    .find()
    .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(list);

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

const postMeal = async (req, res) => {
  // #swagger.tags = ['meals']
  try {
    const meal = {
      name: req.body.name,
      description: req.body.description,
      date: req.body.date
    }
    
    await mongodb
    .getDatabase()
    .db()
    .collection('meals')
    .insertOne(meal);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(meal);

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

module.exports = { getMeals, postMeal };