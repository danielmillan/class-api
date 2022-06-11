const express = require('express');
const debug = require('debug');
const morgan = require('morgan');

const teachers = require('./teachers');
const students = require('./students')
const subjects = require('./subjects') 

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
// TEACHERS
app.get('/teachers',(request, response)=>{
  response.send(teachers.listaDocentes(teachers.docentes));
});

app.post('/teachers', (request, response)=>{
  const docente={
    id: Math.floor(Math.random() * 99 + 1 ),
    nombre: request.body.nombre,
    edad: request.body.edad,
    materia: request.body.materia,
    cursos: request.body.cursos,
    tcPlanta: request.body.tcPlanta,
  }
  response.send(teachers.crearDocente(docente));
});

app.put('/teachers/:id',(request, response)=>{
  const docente = {
    id: Number(request.params.id),
    nombre: request.body.nombre,
    edad: request.body.edad,
    materia: request.body.materia,
    cursos: request.body.cursos,
    tcPlanta: request.body.tcPlanta,
  };
  //logger('se ha recibido el docente', docente);
  response.send(teachers.editarDocente(docente));
});

app.delete('/teachers/:id',(request, response)=>{
  const id = Number(request.params.id);
  response.send(teachers.eliminarDocente(id));
});

// STUDENTS
app.get('/students',(request, response)=>{
  response.send(students.listaEstudiantes(students.students));
});

app.post('/students', (request, response)=>{
  const estudiante={
    id: Math.floor(Math.random() * 99 + 1 ),
    nombre: request.body.nombre,
    edad: request.body.edad,
    curso: request.body.curso,
    materias: request.body.materias
  }
  response.send(students.crearEstudiante(estudiante));
});

app.put('/students/:id',(request, response)=>{
  const estudiante = {
    id: Number(request.params.id),
    nombre: request.body.nombre,
    edad: request.body.edad,
    curso: request.body.curso,
    materias: request.body.materias,
  };
  logger('se ha recibido el estudiante', estudiante);
  response.send(students.editarEstudiante(estudiante));
});

app.delete('/students/:id',(request, response)=>{
  const id = Number(request.params.id);
  response.send(students.eliminarEstudiante(id));
});


//SUBJECTS
app.get('/subjects',(request, response)=>{
  response.send(subjects.listaMaterias(subjects.subjects));
});

app.post('/subjects', (request, response)=>{
  const materia={
    id: Math.floor(Math.random() * 99 + 1 ),
    nombre: request.body.nombre,
    docente: request.body.docente,
    cursos: request.body.cursos,
  }
  response.send(subjects.crearMaterias(materia));
});

app.put('/subjects/:id',(request, response)=>{
  const materia = {
    id: Number(request.params.id),
    nombre: request.body.nombre,
    docente: request.body.docente,
    cursos: request.body.cursos,
  };
  //logger('se ha recibido el docente', docente);
  response.send(subjects.editarMateria(materia));
});

app.delete('/subjects/:id',(request, response)=>{
  const id = Number(request.params.id);
  response.send(subjects.eliminarMateria(id));
});


module.exports = app;
