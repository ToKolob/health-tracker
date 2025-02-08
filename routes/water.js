const express = require('express');
const router = express.Router();

const controller = require('../controllers/water.js');
const { waterIntakeValidationRules, validate } = require('../middleware/validator.js');
//const { isAutehnticated } = require('../middleware/authenticate.js');

router.get('/', controller.getWaterIntake);
router.get('/:id', controller.getSingleWaterIntake);
router.post('/', waterIntakeValidationRules(), validate, controller.postWaterIntake);
router.put('/:id', waterIntakeValidationRules(), validate, controller.updateWaterIntake);
router.delete('/:id', controller.deleteWaterIntake);

module.exports = router;