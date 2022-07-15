const { Router } = require('express');
const SubjectService = require('../services/subjectService');
const RoleMiddlewares = require('../middlewares/role')

const subjectController = Router();

subjectController.get('/', async (request, response) => {
  const resultService = await SubjectService.listSubjects();
  response.send(resultService);
});

subjectController.get('/:id', async (request, response) => {
  const subjectId = Number(request.params.id);
  const resultService = await SubjectService.findSubjectById(subjectId);
  response.send(resultService);
});

subjectController.post('/', RoleMiddlewares.validRole, async (request, response) => {
  const subject = {
    name: request.body.name,
    teacher: request.body.teacher,
  };
  const resultService = await SubjectService.createSubjects(subject);

  response.send(resultService);
});

subjectController.put('/:id', RoleMiddlewares.validRole, async (request, response) => {
  const subject = {
    name: request.body.name,
    teacher: request.body.teacher,
  };
  //logger('se ha recibido el docente', docente);
  const teacherId = Number(request.params.id);
  const resultService = await SubjectService.editSubject(teacherId, subject);
  response.send(resultService);
});

subjectController.delete('/:id', RoleMiddlewares.validRole, async (request, response) => {
  const subjectId = Number(request.params.id);
  const resultService = await SubjectService.deleteSubject(subjectId);
  response.send(resultService);
});

subjectController.get('/teacher/:id', async (request, response) => {
  const teacherId = Number(request.params.id);
  const resultService = await SubjectService.getSubjectsByTeacher(teacherId);
  response.send(resultService);
});

module.exports = subjectController;
