const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.use('/sleep-time', require('./sleep-time.js'));

module.exports = router;