const express = require('express');
const router = express.Router();

const controller = require('../controllers/exercises.js');
const { exerciseValidationRules, validate } = require('../middleware/validator.js');
//const { isAutehnticated } = require('../middleware/authenticate.js');

router.get('/', controller.getExercises);
router.post('/',  exerciseValidationRules(), validate, controller.postExercise);

module.exports = router;