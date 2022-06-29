const { Router } = require('express');
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

module.exports = notesController;
