const express = require('express');
const debug = require('debug');
const morgan = require('morgan');

//logger
const logger = debug('class-api:app');

const app = express();

// Middlewares
app.use(express.urlencoded(false));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (request, response) => {
  logger('log desde la ruta /');
  response.send('hola mundo');
});

module.exports = app;
