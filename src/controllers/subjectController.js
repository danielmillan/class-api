const { Router } = require('express');
const SubjectService = require('../services/subjectService');

const subjectController = Router();

subjectController.get('/subjects', async (request, response) => {
  const resultService = await SubjectService.listSubjects();
  response.send(resultService);
});

subjectController.get('/subjects/:id', async (request, response) => {
  const subjectId = Number(request.params.id);
  const resultService = await SubjectService.findSubjectById(subjectId);
  response.send(resultService);
});

subjectController.post('/subjects', async (request, response) => {
  const subject = {
    name: request.body.name,
    teacher: request.body.teacher,
  };
  const resultService = await SubjectService.createSubjects(subject);

  response.send(resultService);
});

subjectController.put('/subjects/:id', async (request, response) => {
  const subject = {
    name: request.body.name,
    teacher: request.body.teacher,
  };
  //logger('se ha recibido el docente', docente);
  const teacherId = Number(request.params.id);
  const resultService = await SubjectService.editSubject(teacherId, subject);
  response.send(resultService);
});

subjectController.delete('/subjects/:id', async (request, response) => {
  const subjectId = Number(request.params.id);
  const resultService = await SubjectService.deleteSubject(subjectId);
  response.send(resultService);
});

module.exports = subjectController;
