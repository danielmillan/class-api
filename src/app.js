const express = require('express');
const debug = require('debug');
const morgan = require('morgan');
// Controllers
const studentController = require('./controllers/studentController');
const teacherController = require('./controllers/teacherController');
const subjectController = require('./controllers/subjectController');

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

app.use(studentController);
app.use(teacherController);
app.use(subjectController);

module.exports = app;
