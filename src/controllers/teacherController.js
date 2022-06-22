const { Router } = require('express');
const TeacherService = require('../services/teacherService');

const teacherController = Router();

teacherController.get('/teachers', async (request, response) => {
  const resultService = await TeacherService.listTeachers();
  response.send(resultService);
});

teacherController.get('/teachers/:id', async (request, response) => {
  const teacherId = Number(request.params.id);
  const resultService = await TeacherService.findTeacherById(teacherId);
  response.send(resultService);
});

teacherController.post('/teachers', async (request, response) => {
  const teacher = {
    names: request.body.names,
    last_names: request.body.last_names,
    subject: request.body.subject,
    grade: request.body.grade,
  };
  const resultService = await TeacherService.createTeacher(teacher);
  response.send(resultService);
});

teacherController.put('/teachers/:id', async (request, response) => {
  const teacher = {
    names: request.body.names,
    last_names: request.body.last_names,
    subject: request.body.subject,
    grade: request.body.grade,
  };
  const teacherId = Number(request.params.id);
  const resultService = await TeacherService.editTeacher(
    teacherId,
    teacher
  );
  response.send(resultService);
});

teacherController.delete('/teachers/:id', async (request, response) => {
  const teacherId = Number(request.params.id);
  const resultService = await TeacherService.deleteTeacher(teacherId);
  response.send(resultService);
});

module.exports = teacherController;
