const mongodb = require('../data/mongodb.js');
const ObjectId = require('mongodb').ObjectId;

const getSleep = async (req, res) => {
  // #swagger.tags = ['sleep')']

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

const postSleep = async (req, res) => {
  // #swagger.tags = ['sleep')']
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
  getSleep,
  postSleep
}