const mongodb = require('../data/mongodb.js');
const ObjectId = require('mongodb').ObjectId;

const getWaterIntake = async (req, res) => {
  // #swagger.tags = ['water']
  try {
    const list = await mongodb
      .getDatabase()
      .db()
      .collection('waterIntakes')
      .find()
      .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(list);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getSingleWaterIntake = async (req, res) => {
  // #swagger.tags = ['water']
  try {
    const id = req.params.id;
    const objectId = new ObjectId(id);
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid water intake id' });
    }

    const waterIntake = await mongodb.getDatabase().db().collection('waterIntakes').findOne({ _id: objectId });
    if (!waterIntake) {
      return res.status(404).send({ message: 'Water intake not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(waterIntake);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error fetching water intake' });
  }
};

const postWaterIntake = async (req, res) => {
  // #swagger.tags = ['water']
  try {
    const waterIntake = {
      quantity: req.body.quantity,
      date: req.body.date,
      time: req.body.time,
      tags: req.body.tags, 
      type: req.body.type,
      hydrationReason: req.body.hydrationReason, 
      location: req.body.location,
    };

    const data = await mongodb
      .getDatabase()
      .db()
      .collection('waterIntakes')
      .insertOne(waterIntake);

    if (data.acknowledged) {
      res.status(201).json({ message: 'Water intake created successfully' });
    } else {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(waterIntake);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const updateWaterIntake = async (req, res) => {
  // #swagger.tags = ['water']
  try {
    const id = req.params.id;
    const objectId = new ObjectId(id);
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid water intake id' });
    }

    const waterIntake = {
      quantity: req.body.quantity,
      date: req.body.date,
      time: req.body.time,
      tags: req.body.tags, 
      type: req.body.type,
      hydrationReason: req.body.hydrationReason, 
      location: req.body.location,
    };

    const query = { _id: objectId };
    const update = { $set: waterIntake };
    const options = { upsert: true };

    const updatedWaterIntake = await mongodb.getDatabase().db().collection('waterIntakes').updateOne(query, update, options);
    if (updatedWaterIntake.modifiedCount > 0) {
      res.status(200).json({ message: 'Water intake updated successfully' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(waterIntake);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating water intake' });
  }
};

const deleteWaterIntake = async (req, res) => {
  // #swagger.tags = ['water']
  try {
    const id = req.params.id;
    const objectId = new ObjectId(id);
    const query = { _id: objectId };
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid water intake id' });
    }

    const result = await mongodb.getDatabase().db().collection('waterIntakes').deleteOne(query);
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Water intake deleted successfully' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error deleting water intake' });
  }
};

module.exports = { 
  getWaterIntake, 
  postWaterIntake, 
  getSingleWaterIntake, 
  updateWaterIntake, 
  deleteWaterIntake 
};