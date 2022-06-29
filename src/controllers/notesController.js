const { Router, request, response } = require("express");
const { listNotesByStudent } = require("../services/notesService");
const NotesService = require("../services/notesService");

const notesController = Router();

notesController.post('/', async (request, response)=> {
    const add = {
        studentId : request.body.studentId,
        subjectId : request.body.subjectId,
        Note: request.body.Note,
    };
    const resultService = await NotesService.addNote(add);
    response.send(resultService);

});

notesController.get('/', async (request, response)=> {
   const resultService = await NotesService.listNotes();
   response.send(resultService);
});


notesController.put('/:id', async (request, response) => {
    const studentNote = {
        id: Number(request.params.id),
        Note : request.body.Note,
    }; 
    const resultService = await NotesService.editNote(studentNote.id, studentNote.Note);
    response.send(resultService);
});

notesController.get('/student/:id', async (request, response)=> {
    const id = Number(request.params.id);
    const resultService = await NotesService.listNotesByStudent(id);
    response.send(resultService);
});

module.exports = notesController;