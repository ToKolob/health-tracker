const mongodb = require('../data/mongodb.js');
const ObjectId = require('mongodb').ObjectId;

const getExercises = async (req, res) => {
  // #swagger.tags = ['exercises')']

  try {
    const list = await mongodb
    .getDatabase()
    .db()
    .collection('exercises')
    .find()
    .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(list);

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const postExercise = async (req, res) => {
  // #swagger.tags = ['exercises')']
  try {
    const exercise = {
      name: req.body.name,
      duration: req.body.duration,
      date: req.body.date,
      quality: req.body.quality
    }
    await mongodb
    .getDatabase()
    .db()
    .collection('exercises')
    .insertOne(exercise);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(exercise);

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

module.exports = { getExercises, postExercise };