const { Router } = require('express');
const StudentService = require('../services/studentService');

const studentController = Router();

studentController.get('/students', (request, response) => {
  response.send(StudentService.listaEstudiantes(students.students));
});

studentController.post('/students', (request, response) => {
  const estudiante = {
    id: Math.floor(Math.random() * 99 + 1),
    nombre: request.body.nombre,
    edad: request.body.edad,
    curso: request.body.curso,
    materias: request.body.materias,
  };
  response.send(StudentService.crearEstudiante(estudiante));
});

studentController.put('/students/:id', (request, response) => {
  const estudiante = {
    id: Number(request.params.id),
    nombre: request.body.nombre,
    edad: request.body.edad,
    curso: request.body.curso,
    materias: request.body.materias,
  };
  logger('se ha recibido el estudiante', estudiante);
  response.send(StudentService.editarEstudiante(estudiante));
});

studentController.delete('/students/:id', (request, response) => {
  const id = Number(request.params.id);
  response.send(StudentService.eliminarEstudiante(id));
});

module.exports = studentController;
