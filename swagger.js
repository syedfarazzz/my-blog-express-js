const swaggerAutogen = require('swagger-autogen')({openapi:'3.0.0'});

// const doc = {
//     definition: {
//         openapi: "3.1.0",
//   info: {
//     title: 'My API',
//     description: 'Description',
//   },
//   host: 'localhost:3000',
//   schemes: ['http'],
// }}

const doc = {
    info: {
      version: '',      // by default: '1.0.0'
      title: 'My API',        // by default: 'REST API'
      description: 'descr',  // by default: ''
    },
    host: 'localhost:3000',      // by default: 'localhost:3000'
    basePath: '',  // by default: '/'
    schemes: ['http'],   // by default: ['http']
    consumes: ['application/json'],  // by default: ['application/json']
    produces: ['application/json'],  // by default: ['application/json']
    tags: [        // by default: empty Array
      {
        name: 'User',         // Tag name
        description: 'good',  // Tag description
      },
      // { ... }
    ],
    securityDefinitions: {},  // by default: empty object
    components: {}            // by default: empty object (OpenAPI 3.x)
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

// swaggerAutogen(outputFile, endpointsFiles, doc);
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js'); // Your project's root file
  });