const { Router } = require('express');
const SubjectService = require('../services/subjectService');

const subjectController = Router();

subjectController.get('/subjects', (request, response) => {
  response.send(SubjectService.listaMaterias(subjects.subjects));
});

subjectController.post('/subjects', (request, response) => {
  const materia = {
    id: Math.floor(Math.random() * 99 + 1),
    nombre: request.body.nombre,
    docente: request.body.docente,
    cursos: request.body.cursos,
  };
  response.send(SubjectService.crearMaterias(materia));
});

subjectController.put('/subjects/:id', (request, response) => {
  const materia = {
    id: Number(request.params.id),
    nombre: request.body.nombre,
    docente: request.body.docente,
    cursos: request.body.cursos,
  };
  //logger('se ha recibido el docente', docente);
  response.send(SubjectService.editarMateria(materia));
});

subjectController.delete('/subjects/:id', (request, response) => {
  const id = Number(request.params.id);
  response.send(SubjectService.eliminarMateria(id));
});

module.exports = subjectController;
