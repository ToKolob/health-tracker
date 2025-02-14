const express = require('express');
const router = express.Router();

const controller = require('../controllers/exercises.js');
const { exerciseValidationRules, validate } = require('../middleware/validator.js');
const { isAutehnticated } = require('../middleware/authenticate.js');

router.get('/', controller.getAllExercises);
router.get('/:id', controller.getByIDExercises);
router.post('/', isAutehnticated, exerciseValidationRules(),  validate, controller.postExercise);
router.put('/:id', isAutehnticated, exerciseValidationRules(), validate, controller.updateExercises);
router.delete('/:id', isAutehnticated, controller.deleteExercises)

module.exports = router;

