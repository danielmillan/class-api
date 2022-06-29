const express = require('express');
const debug = require('debug');
const morgan = require('morgan');
// Controllers
const courseController = require('./controllers/courseController');
const studentController = require('./controllers/studentController');
const teacherController = require('./controllers/teacherController');
const subjectController = require('./controllers/subjectController');
const notesController = require('./controllers/notesController');

//logger
const logger = debug('class-api:app');
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (request, response) => {
  logger('log desde la ruta /');
  response.send('hola mundo');
});

app.use('/courses', courseController);
app.use('/students', studentController);
app.use('/teachers', teacherController);
app.use('/subjects', subjectController);
app.use('/notes', notesController);
module.exports = app;
