const { Router } = require('express');
const TeacherService = require('../services/teacherService');

const teacherController = Router();

teacherController.get('/', async (request, response) => {
  const resultService = await TeacherService.listTeachers();
  response.send(resultService);
});

teacherController.get('/:id', async (request, response) => {
  const teacherId = Number(request.params.id);
  const resultService = await TeacherService.findTeacherById(teacherId);
  response.send(resultService);
});

teacherController.post('/', async (request, response) => {
  const teacher = {
    names: request.body.names,
    last_names: request.body.last_names,
    subject: request.body.subject,
    grade: request.body.grade,
  };
  const resultService = await TeacherService.createTeacher(teacher);
  response.send(resultService);
});

teacherController.put('/:id', async (request, response) => {
  const teacher = {
    names: request.body.names,
    last_names: request.body.last_names,
    subject: request.body.subject,
    grade: request.body.grade,
  };
  const teacherId = Number(request.params.id);
  const resultService = await TeacherService.editTeacher(teacherId, teacher);
  response.send(resultService);
});

teacherController.delete('/:id', async (request, response) => {
  const teacherId = Number(request.params.id);
  const resultService = await TeacherService.deleteTeacher(teacherId);
  response.send(resultService);
});

teacherController.post('/subject/register', async (request, response) => {
  const register = {
    teacherId: request.body.teacherId,
    subjectId: request.body.subjectId,
  };
  const resultService = await TeacherService.addTeacherInASubject(register);
  response.send(resultService);
});

module.exports = teacherController;
