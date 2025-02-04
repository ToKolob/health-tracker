const express = require('express');
const router = express.Router();

const controller = require('../controllers/sleep.js');
const { sleepTimeValidationRules, validate } = require('../middleware/validator.js');
//const { isAutehnticated } = require('../middleware/authenticate.js');

router.get('/', controller.getSleep);
router.post('/',  sleepTimeValidationRules(), validate, controller.postSleep);

module.exports = router;