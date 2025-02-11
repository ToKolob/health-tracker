const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.get('/', (req, res) => {
  res.send('<p>Hello! Welcome to Health Tracker</p>' +
    '<br> <a href="/api-docs">API Documentation</a>' +
    '<br> <a href="/auth/google">Login with Google</a>');
});

router.use('/exercises', require("./exercises.js"));
router.use('/meals', require('./meals.js'));
router.use('/water', require('./water.js'));
router.use('/sleep', require('./sleep.js'));

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;