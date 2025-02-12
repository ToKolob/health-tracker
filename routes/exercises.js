const express = require('express');
const router = express.Router();

const controller = require('../controllers/exercises.js');
const validate = require('../middleware/validator.js');
//const { isAutehnticated } = require('../middleware/authenticate.js');

router.get('/', controller.getAllExercises);
router.get('/:id', controller.getByIDExercises);
// router.get('/:name', controller.getByNameExercises);
// router.get('/:date', controller.getByDateExercises);
// router.get('/:duration', controller.getByDurationExercises);
router.post('/',  validate.exerciseValidationRules, controller.postExercise);
router.put('/', validate.exerciseValidationRules, controller.updateExercises);
router.delete('/:id', controller.deleteExercises)

module.exports = router;

