const express = require('express');
const connectDb = require('./config/dbConnection');
const logResponseStatus = require('./middleware/logApiHits');
require('dotenv').config()
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json');
const errorHandler = require('./middleware/errorHandler');

connectDb();
const app = express()
const port = process.env.PORT || 5000;

//Middlewares
//this will give a parser which helps in getting data from client and get parsed, as without it, the req body will be undefined
app.use(express.json());

// Middleware to log API hits
// app.use((req, res, next) => {
//   console.log(`[${dateT[0]}] ${req.protocol} ${req.method} ${req.originalUrl} ${res.statusCode}`);
//   next();
// });
// Attach the middleware globally to log status codes for all routes
app.use(logResponseStatus);

// Users
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/userRoutes'));

//Articles
app.use('/api/articles', require('./routes/articleRoutes'));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(errorHandler);

app.listen(port, () => {
  console.log(`SenseClub app listening on port ${port}`);
})