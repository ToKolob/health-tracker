const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Health Tracker API',
    description: 'Health Tracker for CSE341 project',
  },
  host: 'health-tracker-qhyk.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);