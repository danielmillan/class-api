const express = require('express');
const debug = require('debug');
const morgan = require('morgan');

const teachers = require('./teachers');

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

app.get('/teachers',(request, response)=>{
  response.send(teachers.listaDocentes(teachers.docentes));
});

app.post('/teachers', (request, response)=>{
  const docente={
    id: Math.floor(Math.random() * 99 + 1 ),
    nombre: request.body.nombre,
    edad: request.body.edad,
    materias: request.body.materias,
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
    materias: request.body.materias,
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

module.exports = app;
