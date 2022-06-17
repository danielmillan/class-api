const { Router } = require('express');
const StudentService = require('../services/studentService');

const studentController = Router();

studentController.get('/students', async (request, response) => {
  const resultService = await StudentService.listStudents();
  response.send(resultService);
});

studentController.get('/students/:id', async (request, response) => {
  const studentId = Number(request.params.id);
  const resultService = await StudentService.findStudentById(studentId);
  response.send(resultService);
});

studentController.post('/students', async (request, response) => {
  const student = {
    names: request.body.names,
    last_names: request.body.last_names,
    code: request.body.code,
    grade: request.body.grade,
  };
  const resultService = await StudentService.createStudent(student);
  response.send(resultService);
});

studentController.put('/students/:id', async (request, response) => {
  const student = {
    names: request.body.names,
    last_names: request.body.last_names,
    code: request.body.code,
    grade: request.body.grade,
  };
  const studentId = Number(request.params.id);
  const resultService = await StudentService.editStudent(
    studentId,
    student
  );
  response.send(resultService);
});

studentController.delete('/students/:id', async (request, response) => {
  const studentId = Number(request.params.id);
  const resultService = await StudentService.deleteStudent(studentId);
  response.send(resultService);
});

module.exports = studentController;
