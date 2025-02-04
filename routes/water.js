const express = require('express');
const router = express.Router();

const controller = require('../controllers/water.js');
const { waterValidationRules, validate } = require('../middleware/validator.js');
//const { isAutehnticated } = require('../middleware/authenticate.js');

router.get('/', controller.getWater);
router.post('/',  waterValidationRules(), validate, controller.postWater);

module.exports = router;