const express = require('express');
const router = express.Router();

const controller = require('../controllers/meals.js');
const { mealValidationRules, validate } = require('../middleware/validator.js');
//const { isAutehnticated } = require('../middleware/authenticate.js');

router.get('/', controller.getMeals);
router.post('/',  mealValidationRules(), validate, controller.postMeal);

module.exports = router;