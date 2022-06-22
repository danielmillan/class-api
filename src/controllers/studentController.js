const { Router } = require('express');
const StudentService = require('../services/studentService');

const studentController = Router();

studentController.get('/', async (request, response) => {
  const resultService = await StudentService.listStudents();
  response.send(resultService);
});

studentController.get('/:id', async (request, response) => {
  const studentId = Number(request.params.id);
  const resultService = await StudentService.findStudentById(studentId);
  response.send(resultService);
});

studentController.post('/', async (request, response) => {
  const student = {
    names: request.body.names,
    last_names: request.body.last_names,
    code: request.body.code,
    grade: request.body.grade,
  };
  const resultService = await StudentService.createStudent(student);
  response.send(resultService);
});

studentController.put('/:id', async (request, response) => {
  const student = {
    names: request.body.names,
    last_names: request.body.last_names,
    code: request.body.code,
    grade: request.body.grade,
  };
  const studentId = Number(request.params.id);
  const resultService = await StudentService.editStudent(studentId, student);
  response.send(resultService);
});

studentController.delete('/:id', async (request, response) => {
  const studentId = Number(request.params.id);
  const resultService = await StudentService.deleteStudent(studentId);
  response.send(resultService);
});

studentController.post('/courses/register', async (request, response) => {
  const register = {
    studentId: Number(request.body.studentId),
    courseId: Number(request.body.courseId),
  };
  const resultService = await StudentService.registerStudentInACourse(
    register.studentId,
    register.courseId
  );
  response.send(resultService);
});

module.exports = studentController;
