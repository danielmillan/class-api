const { Router, request } = require('express');
const NotesService = require('../services/notesService');

const notesController = Router();

notesController.post('/', async (request, response) => {
  const note = {
    studentId: Number(request.body.studentId),
    subjectId: Number(request.body.subjectId),
    note: Number(request.body.note),
  };
  console.log('La nota a registrar es: ', note);
  const resultService = await NotesService.addNote(note);
  response.send(resultService);
});

notesController.get('/', async (request, response) => {
  const resultService = await NotesService.listNotes();
  response.send(resultService);
});

notesController.put('/:id', async (request, response) => {
  const studentNote = {
    id: Number(request.params.id),
    note: Number(request.body.note),
  };
  const resultService = await NotesService.editNote(
    studentNote.id,
    studentNote.Note
  );
  response.send(resultService);
});

notesController.get('/student/:id', async (request, response) => {
  const id = Number(request.params.id);
  const resultService = await NotesService.listNotesByStudent(id);
  response.send(resultService);
});

notesController.get('/subject-course/:id', async (request, response) => {
  const courseNumber = Number(request.query.courseNumber);
  const subjectId = Number(request.params.id);
  const resultService = await NotesService.listNotesByCourseAndSubject(
    courseNumber,
    subjectId
  );
  response.send(resultService);
});

notesController.get('/grade/:id', async (request, response) => {
  const gradeId = Number(request.params.id);
  const resultService = await NotesService.listNotesByGrade(gradeId);
  response.send(resultService);
});

notesController.get('/subject/:id', async (request, response) => {
  const subjectId = Number(request.params.id);
  const resultService = await NotesService.getNoteBySubject(subjectId);
  response.send(resultService);
});

notesController.get('/subject-grade/:id', async (request, response) => {
  const subjectId = Number(request.params.id);
  const gradeId = Number(request.query.gradeId);
  const resultService = await NotesService.getNoteBySubjectAndGrade(
    subjectId,
    gradeId
  );
  response.send(resultService);
});

notesController.get('/teacher/:id', async (request, response) => {
  const id = Number(request.params.id);
  const resultService = await NotesService.getNotesByTeacher(id);
  response.send(resultService);
});

notesController.get('/subject-student', async (request, response) => {
  const studentId = Number(request.params.id);
  const subjectId = Number(request.query.subjectId);
  const resultService = await NotesService.getNotesBySubjectAndStudent(
    studentId,
    subjectId
  );
  response.send(resultService);
});

notesController.get('/average/subject-course', async (request, response) => {
  const subjectId = Number(request.query.subjectId);
  const courseId = Number(request.query.courseId);
  const resultService = await NotesService.averageNoteforSubejectCourse(
    subjectId,
    courseId
  );
  response.send(resultService);
});
module.exports = notesController;
