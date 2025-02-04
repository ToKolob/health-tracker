const express = require('express');
const router = express.Router();

const controller = require('../controllers/sleep-time.js');
const { sleepTimeValidationRules, validate } = require('../middleware/validator.js');
//const { isAutehnticated } = require('../middleware/authenticate.js');

router.get('/', controller.getSleepTime);
router.post('/',  sleepTimeValidationRules(), validate, controller.postSleepTime);

module.exports = router;