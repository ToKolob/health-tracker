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
    res.status(500).json(err);
  }
}

const getSingleMeal = async (req, res) => {
  // #swagger.tags = ['meals']
  try {
    const id = req.params.id;
    const objectId = new ObjectId(id);
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid meal id' });
    }

    const meal = await mongodb.getDatabase().db().collection('meals').findOne({ _id: objectId });
    if (!meal) {
      return res.status(404).send({ message: 'Meal not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(meal);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'error fetching meal' });
  }
};

const postMeal = async (req, res) => {
  // #swagger.tags = ['meals']
  try {
    const meal = {
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      calories: req.body.calories,
      tags: req.body.tags,
      satisfaction: req.body.satisfaction,
      mealType: req.body.mealType
    };

    const data = await mongodb
      .getDatabase()
      .db()
      .collection('meals')
      .insertOne(meal);

    if (data.acknowledged) {
      res.status(201).json({ message: 'Meal created successfully' });
    } else {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(meal);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const updateMeal = async (req, res) => {
  // #swagger.tags = ['meals']
  try {
    const id = req.params.id;
    const objectId = new ObjectId(id);
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid meal id' });
    }

    const meal = {
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      calories: req.body.calories,
      tags: req.body.tags,
      satisfaction: req.body.satisfaction,
      mealType: req.body.mealType
    }

    const query = { _id: objectId };
    const update = { $set: meal };
    const options = { $upsert: true };

    const updatedMeal = await mongodb.getDatabase().db().collection('meals').updateOne(query, update, options);
    if (updateMeal.modifiedCount > 0) {
      res.status(200).json({ message: 'Meal updated successfully' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(meal);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'error updating meal' });
  }
};

const deleteMeal = async (req, res) => {
  // #swagger.tags = ['meals']
  try {
    const id = req.params.id;
    const objectId = new ObjectId(id);
    const query = { _id: objectId };
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid meal id' });
    }

    const result = await mongodb.getDatabase().db().collection('meals').deleteOne(query);
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Meal deleted successfully' });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'error deleting meal' });
  }
};

module.exports = { getMeals, postMeal, getSingleMeal, updateMeal, deleteMeal };