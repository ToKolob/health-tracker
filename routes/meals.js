const express = require('express');
const router = express.Router();

const controller = require('../controllers/meals.js');
const { mealValidationRules, validate } = require('../middleware/validator.js');
const { isAutehnticated } = require('../middleware/authenticate.js');

router.get('/', controller.getMeals);
router.get('/:id', controller.getSingleMeal);
router.post('/', isAutehnticated, mealValidationRules(), validate, controller.postMeal);
router.put('/:id', isAutehnticated, mealValidationRules(), validate, controller.updateMeal);
router.delete('/:id', controller.deleteMeal);
 
module.exports = router;