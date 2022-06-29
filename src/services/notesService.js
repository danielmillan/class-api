const debug = require('debug');
const prisma = require('../prisma/client');

//logger
const logger = debug('class-api:notesService');

class notesService{

static addNote = async (add) => {
logger('Agregando nota')
await prisma.subject_Note_for_Student.create({
    data: add,
});
    return 'Se ha agregado la nota al estudiante'
};

static editNote = async (id, Note) =>{
    logger('Editando nota del estudiante')
    const editNote = await prisma.subject_Note_for_Student.update({
        where:{
            id
        },
        data:{
            Note
        },
    });
    return 'Se ha editado la nota al estudiante';
};

static listNotes = async () => {
    const listNotes = await prisma.subject_Note_for_Student.findMany();
    return listNotes;
}

static listNotesByStudent = async (studentId) =>{
    logger('Enviando Listado de notas por estudiante');
    const listNotesByStudent = await prisma.subject_Note_for_Student.findMany({
        where:{
            studentId
        },
        select:{
            Student:{
                select:{
                    names: true,
                    last_names: true,
                    code: true,
                },
            },
            Subject:{
                select:{
                    name:true,
                },
            },
            Note: true,
        },

    });
    return listNotesByStudent;
};

}

module.exports = notesService;