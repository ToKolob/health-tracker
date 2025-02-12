const mongodb = require('../data/mongodb.js');
const ObjectId = require('mongodb').ObjectId;

const getSleepTime = async (req, res) => {
  // #swagger.tags = ['sleep')']

  try {
    const list = await mongodb
    .getDatabase()
    .db()
    .collection('sleepTime')
    .find()
    .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(list);

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getSingleSleepTime = async (req, res) => {
  // #swagger.tags = ['sleep']
  try {
    const id = req.params.id;
    const objectId = new ObjectId(id);
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid sleep time id' });
    }

    const sleeptimes = await mongodb.getDatabase().db().collection('sleepTime').findOne({ _id: objectId });
    if (!sleeptimes) {
      return res.status(404).send({ message: 'Sleep time not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(sleeptimes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error fetching sleep time' });
  }
};

const postSleepTime = async (req, res) => {
  // #swagger.tags = ['sleep')']
  try {
    const sleeptimes = {
      sleep_date: req.body.sleep_date,
      bedtime: req.body.bedtime,
      wakeup_time: req.body.wakeup_time,
      total_sleep_hours: req.body.total_sleep_hours, 
      sleep_quality: req.body.sleep_quality,
      dreams_recorded: req.body.dreams_recorded, 
      notes: req.body.notes,
    };
  
    const data = await mongodb.getDatabase().db().collection('sleepTime').insertOne(sleeptimes);
  
    if (data.acknowledged) {
      res.status(201).json({ message: 'Sleep Time created successfully' });
    }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(sleeptimes);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  };

const updateSleepTime = async (req, res) => {
  // #swagger.tags = ['sleep']
  try {
    const id = req.params.id;
    const objectId = new ObjectId(id);
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid sleep time id' });
    }

    const sleeptimes = {
      sleep_date: req.body.sleep_date,
      bedtime: req.body.bedtime,
      wakeup_time: req.body.wakeup_time,
      total_sleep_hours: req.body.total_sleep_hours, 
      sleep_quality: req.body.sleep_quality,
      dreams_recorded: req.body.dreams_recorded, 
      notes: req.body.notes,
    };

    const query = { _id: objectId };
    const update = { $set: sleeptimes };
    const options = { upsert: true };

    const updatedSleepTime = await mongodb.getDatabase().db().collection('sleepTime').updateOne(query, update, options);
    if (updatedSleepTime.modifiedCount > 0) {
      res.status(200).json({ message: 'Sleep time updated successfully' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(sleeptimes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating sleep time' });
  }
};

const deleteSleepTime = async (req, res) => {
  // #swagger.tags = ['sleep']
  try {
    const id = req.params.id;
    const objectId = new ObjectId(id);
    const query = { _id: objectId };
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid sleep time id' });
    }

    const result = await mongodb.getDatabase().db().collection('sleepTime').deleteOne(query);
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Sleep time deleted successfully' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error deleting sleep time' });
  }
};

module.exports = {
  getSleepTime, 
  getSingleSleepTime,
  postSleepTime,
  updateSleepTime,
  deleteSleepTime
}