const mongodb = require('../data/mongodb.js');
const ObjectId = require('mongodb').ObjectId;

const getSleepTime = async (req, res) => {
  // #swagger.tags = ['sleep-time')']

  try {
    const list = await mongodb
    .getDatabase()
    .db()
    .collection('sleep-time')
    .find()
    .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(list);

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const postSleepTime = async (req, res) => {
  // #swagger.tags = ['sleep-time')']
  try {
    const sleepTime = {
      duration: req.body.duration,
      date: req.body.date,
      quality: req.body.quality
    }
    await mongodb
    .getDatabase()
    .db()
    .collection('sleep-time')
    .insertOne(sleepTime);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(sleepTime);

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = {
  getSleepTime,
  postSleepTime
}