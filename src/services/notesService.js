const { Prisma } = require('@prisma/client');
const debug = require('debug');
const prisma = require('../prisma/client');

//logger
const logger = debug('class-api:notesService');

class notesService {
  static addNote = async (note) => {
    logger('Agregando nota: %j', note);
    await prisma.subject_Note_for_Student.create({
      data: {
        studentId: note.studentId,
        subjectId: note.subjectId,
        note: new Prisma.Decimal(note.note),
      },
    });
    return 'Se ha agregado la nota al estudiante';
  };

  static editNote = async (id, Note) => {
    logger('Editando nota del estudiante');
    await prisma.subject_Note_for_Student.update({
      where: {
        id,
      },
      data: {
        Note,
      },
    });
    return 'Se ha editado la nota al estudiante';
  };

  static listNotes = async () => {
    const listNotes = await prisma.subject_Note_for_Student.findMany();
    return listNotes;
  };

  static listNotesByStudent = async (studentId) => {
    logger('Enviando Listado de notas por estudiante');
    const listNotesByStudent = await prisma.subject_Note_for_Student.findMany({
      where: {
        studentId,
      },
      select: {
        Student: {
          select: {
            names: true,
            last_names: true,
            code: true,
          },
        },
        Subject: {
          select: {
            name: true,
          },
        },
        note: true,
      },
    });
    return listNotesByStudent;
  };

  static listNotesByCourseAndSubject = async (courseNumber, subjectId) => {
    logger('Enviando Listado de notas por curso-materia');
    const listNotesByStudent = await prisma.subject_Note_for_Student.findMany({
      where: {
        subjectId,
        Student: {
          Students_from_Courses: {
            every: {
              course: {
                courseNumber,
              },
            },
          },
        },
      },
      select: {
        Subject: {
          select: {
            name: true,
          },
        },
        Student: {
          select: {
            names: true,
            last_names: true,
            Students_from_Courses: {
              select: {
                course: {
                  select: {
                    courseNumber: true,
                  },
                },
              },
            },
          },
        },
        note: true,
      },
    });
    const listNotesFormat = listNotesByStudent.map((noteByCourse) => {
      return {
        note: noteByCourse.note,
        subject: noteByCourse.Subject.name,
        student: `${noteByCourse.Student.names} ${noteByCourse.Student.last_names}`,
        course:
          noteByCourse.Student.Students_from_Courses[0].course.courseNumber,
      };
    });
    return listNotesFormat;
  };

  // filtrar las notas por grado -> route /notes/grade/:id
  // filtrar las notas por materia -> route /notes/subject/:id
  // filtrar las notas por materia y grado -> route /notes/subject-grade/:id?grade=6
  // filtrar las notas por profesor = -> route /notes/teacher/:id
  // filtrar las notas por materia y estudiante -> route /notes/subject-student/:id?subjectId=2

  /**
   * (opcional) https://www.prisma.io/docs/concepts/components/prisma-client/aggregation-grouping-summarizing
   *
   * route /notes/average/subject-course?subjectId=2&courseId=1
   *
   * promedio de una materia por curso
   *
   * ejemplo:
   * {
   *  subject: "Matematicas",
   *  course: "601",
   *  average: 2.5
   * }
   */
}

module.exports = notesService;
