const { Router } = require('express');
const TeacherService = require('../services/teacherService');

const teacherController = Router();

teacherController.get('/teachers', (request, response) => {
  response.send(TeacherService.listaDocentes(teachers.docentes));
});

teacherController.post('/teachers', (request, response) => {
  const docente = {
    id: Math.floor(Math.random() * 99 + 1),
    nombre: request.body.nombre,
    edad: request.body.edad,
    materia: request.body.materia,
    cursos: request.body.cursos,
    tcPlanta: request.body.tcPlanta,
  };
  response.send(TeacherService.crearDocente(docente));
});

teacherController.put('/teachers/:id', (request, response) => {
  const docente = {
    id: Number(request.params.id),
    nombre: request.body.nombre,
    edad: request.body.edad,
    materia: request.body.materia,
    cursos: request.body.cursos,
    tcPlanta: request.body.tcPlanta,
  };
  //logger('se ha recibido el docente', docente);
  response.send(TeacherService.editarDocente(docente));
});

teacherController.delete('/teachers/:id', (request, response) => {
  const id = Number(request.params.id);
  response.send(TeacherService.eliminarDocente(id));
});

module.exports = teacherController;
