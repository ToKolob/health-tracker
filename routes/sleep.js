const express = require('express');
const router = express.Router();

const controller = require('../controllers/sleep.js');
const { sleepTimeValidationRules, validate } = require('../middleware/validator.js');
//const { isAutehnticated } = require('../middleware/authenticate.js');

router.get('/', controller.getSleepTime);
router.get('/:id', controller.getSingleSleepTime);
router.post('/',  sleepTimeValidationRules(), validate, controller.postSleepTime);
router.put('/:id', sleepTimeValidationRules(), validate, controller.updateSleepTime);
router.delete('/:id', controller.deleteSleepTime);


module.exports = router;