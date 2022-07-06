const express = require('express');
const debug = require('debug');
const morgan = require('morgan');
// Controllers
const authController = require('./controllers/authController');
const courseController = require('./controllers/courseController');
const studentController = require('./controllers/studentController');
const teacherController = require('./controllers/teacherController');
const subjectController = require('./controllers/subjectController');
const notesController = require('./controllers/notesController');
const userController = require('./controllers/userController');
const AuthMiddlewares = require('./middlewares/auth');

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

app.use('/auth', authController);
app.use('/courses', [AuthMiddlewares.validToken], courseController);
app.use('/students', [AuthMiddlewares.validToken], studentController);
app.use('/teachers', [AuthMiddlewares.validToken], teacherController);
app.use('/subjects', [AuthMiddlewares.validToken], subjectController);
app.use('/notes', [AuthMiddlewares.validToken], notesController);
app.use('/users', [AuthMiddlewares.validToken], userController);

module.exports = app;
