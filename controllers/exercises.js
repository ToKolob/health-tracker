const mongodb = require('../data/mongodb');
const ObjectId = require('mongodb').ObjectId;

const getAllExercises = async (req, res) => {
    // #swagger.tags = ['exercises']
    const result = await mongodb.getDatabase().db().collection('exercises').find();
    result.toArray().then((exercises) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(exercises);
    });
};

const getByIDExercises = async (req, res) => {
    // #swagger.tags = ['exercises']
    try {            
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid exercise id to find an exercise.');
        }
        const exerciseID = new ObjectId(req.params.id);

        const result = await mongodb.getDatabase().db().collection('exercises').findOne({_id: exerciseID});

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);

    } catch (err) {
        console.log(err);
        res.status(500).json(response.error || 'Some error occurred while fetching the exercise.');
    }
};

const postExercise = async (req, res) => {
    // #swagger.tags = ['exercises']
    try {
        const exercise = {
            name: req.body.name,
            description: req.body.description,
            duration: req.body.duartion,
            date: req.body.date
        };
        const response = await mongodb
        .getDatabase()
        .db()
        .collection('exercises')
        .insertOne(exercise);

        if (response.acknowledged) {
            res.status(201).json({ message: 'Exercise created successfully' });
        } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(meal);
        }    

    } catch (err) {
        console.log(err);
        res.status(500).json(response.error || 'Some error occurred while creating the exercise.');
    }
};

const updateExercises = async (req, res) => {
    // #swagger.tags = ['exercises']
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
    const response = await mongodb.getDatabase().db().collection('exercises').modifyOne({_id: exerciseId}, exercise);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the exercise.');
    }
};

const deleteExercises = async (req, res) => {
    // #swagger.tags = ['exercises']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid exercise id to delete an exercise.');
      }
    const authorId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('exercises').deleteOne({_id: exerciseId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the exercise.');
    }
};

module.exports = {
    getAllExercises,
    getByIDExercises,
    postExercise,
    updateExercises,
    deleteExercises
};