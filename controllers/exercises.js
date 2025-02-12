const mongodb = require('../data/mongodb');
const ObjectId = require('mongodb').ObjectId;

const getAllExercises = async (req, res) => {
    const result = await mongodb.getDatabase().db('final-project').collection('exercises').find();
    result.toArray().then((exercises) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(exercises);
    });
};

const getByIDExercises = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid exercise id to find an exercise.');
      }
    const exerciseID = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('final-project').collection('exercises').find({_id: exerciseId });
    result.toArray().then((exercises) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(exercises[0]);
    });
};

const getByDurationExercises = async (req, res) => {
//   if (!ObjectId.isValid(req.params.duration)) {
//       res.status(400).json('Must use a valid duration duration to find an exercise.');
//     }
  const duration = new ObjectId(req.params.duration);
  const result = await mongodb.getDatabase().db('final-project').collection('exercises').find({_id: exerciseDuration });
  result.toArray().then((exercises) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(exercises[0]);
  });
};

const getByNameExercises = async (req, res) => {
//   if (!ObjectId.isValid(req.params.name)) {
//       res.status(400).json('Must use a valid name to find an exercise.');
//     }
  const name = new ObjectId(req.params.name);
  const result = await mongodb.getDatabase().db('final-project').collection('exercises').find({_id: exerciseName });
  result.toArray().then((exercises) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(exercises[0]);
  });
};
const getByDateExercises = async (req, res) => {
//   if (!ObjectId.isValid(req.params.date)) {
//       res.status(400).json('Must use a valid date to find an exercise.');
//     }
  const date = new ObjectId(req.params.date);
  const result = await mongodb.getDatabase().db('final-project').collection('exercises').find({_id: exerciseDate });
  result.toArray().then((exercises) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(exercises[0]);
  });
};

const postExercise = async (req, res) => {
    const exercise = {
        name: req.body.name,
        description: req.body.description,
        duration: req.body.duartion,
        date: req.body.date
    };
    const response = await mongodb.getDatabase().db('final-project').collection('exercises').insertOne(exercise);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the exercise.');
    }
};

const updateExercises = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid exercise id to update an exercise.');
      }
    const exerciseId = new ObjectId(req.params.id);
    const exercise = {
      name: req.body.name,
      description: req.body.description,
      duration: req.body.duartion,
      date: req.body.date
    };
    const response = await mongodb.getDatabase().db('final-project').collection('exercises').modifyOne({_id: exerciseId}, exercise);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the exercise.');
    }
};

const deleteExercises = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid exercise id to delete an exercise.');
      }
    const authorId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('final-project').collection('exercises').deleteOne({_id: exerciseId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the exercise.');
    }
};

module.exports = {
    getAllExercises,
    getByIDExercises,
    getByNameExercises,
    getByDurationExercises,
    getByDateExercises,
    postExercise,
    updateExercises,
    deleteExercises
};