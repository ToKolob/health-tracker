const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.get('/', (req, res) => {
  res.send('<p>Hello! Welcome to Memorize Quotes API </p>' +
    '<br> <a href="/api-docs">API Documentation</a>' +
    '<br> <a href="/auth/google">Login with Google</a>');
});

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.use('/sleep-time', require('./sleep-time.js'));

module.exports = router;