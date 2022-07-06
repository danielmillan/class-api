const { Prisma } = require("@prisma/client");
const debug = require("debug");
const prisma = require("../prisma/client");

//logger
const logger = debug("class-api:notesService");

class notesService {
  static addNote = async (note) => {
    logger("Agregando nota: %j", note);
    await prisma.subject_Note_for_Student.create({
      data: {
        studentId: note.studentId,
        subjectId: note.subjectId,
        note: new Prisma.Decimal(note.note),
      },
    });
    return "Se ha agregado la nota al estudiante";
  };

  static editNote = async (id, Note) => {
    logger("Editando nota del estudiante");
    await prisma.subject_Note_for_Student.update({
      where: {
        id,
      },
      data: {
        Note,
      },
    });
    return "Se ha editado la nota al estudiante";
  };

  static listNotes = async () => {
    const listNotes = await prisma.subject_Note_for_Student.findMany();
    return listNotes;
  };

  static listNotesByStudent = async (studentId) => {
    logger("Enviando Listado de notas por estudiante");
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
    logger("Enviando Listado de notas por curso-materia");
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
  static listNotesByGrade = async (gradeId) => {
    logger("enviando listado de Notas por Grado");
    const listNotesByGrade = await prisma.subject_Note_for_Student.findMany({
      where: {
        Student: {
          Students_from_Courses: {
            every: {
              course: {
                gradeId,
              },
            },
          },
        },
      },
      select: {
        Student: {
          select: {
            names: true,
            last_names: true,
            Students_from_Courses: {
              select: {
                course: {
                  select: {
                    courseNumber: true,
                    grade: {
                      select: {
                        gradeNumber: true,
                      },
                    },
                  },
                },
              },
            },
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

    const notesBygradeFormat = listNotesByGrade.map((notesBygrade) => {
      return {
        student: `${notesBygrade.Student.names} ${notesBygrade.Student.last_names}`,
        subject: notesBygrade.Subject.name,
        note: notesBygrade.note,
        course:
          notesBygrade.Student.Students_from_Courses[0].course.courseNumber,
        grade:
          notesBygrade.Student.Students_from_Courses[0].course.grade
            .gradeNumber,
      };
    });
    return notesBygradeFormat;
  };
  // filtrar las notas por materia -> route /notes/subject/:id
  static getNoteBySubject = async (subjectId) => {
    logger("enviando listado de Notas por Materia");
    const getNoteBySubject = await prisma.subject_Note_for_Student.findMany({
      where: {
        subjectId,
      },
      select: {
        Student: {
          select: {
            names: true,
            last_names: true,
            Students_from_Courses: {
              select: {
                course: true,
              },
            },
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
    //return getNoteBySubject;
    const getNoteBySubjectFormat = getNoteBySubject.map((noteBysubject) => {
      return {
        student: `${noteBysubject.Student.names} ${noteBysubject.Student.last_names}`,
        subject: noteBysubject.Subject.name,
        note: noteBysubject.note,
        course:
          noteBysubject.Student.Students_from_Courses[0].course.courseNumber,
      };
    });
    return getNoteBySubjectFormat;
  };
  // filtrar las notas por materia y grado -> route /notes/subject-grade/:id?grade=6
  static getNoteBySubjectAndGrade = async (subjectId, gradeId) => {
    logger("Enviando listado de Notas por Materia y Grado");
    const getNoteBySubjectAndGrade =
      await prisma.subject_Note_for_Student.findMany({
        where: {
          subjectId,
          Student: {
            Students_from_Courses: {
              every: {
                course: {
                  gradeId,
                },
              },
            },
          },
        },
        select: {
          Student: {
            select: {
              names: true,
              last_names: true,
              Students_from_Courses: {
                select: {
                  course: {
                    select: {
                      grade: {
                        select: {
                          gradeNumber: true,
                        },
                      },
                    },
                  },
                },
              },
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
    //return getNoteBySubjectAndGrade;
    const getNoteBySubjectAndGradeFormat = getNoteBySubjectAndGrade.map(
      (noteBySubjectAndGrade) => {
        return {
          student: `${noteBySubjectAndGrade.Student.names} ${noteBySubjectAndGrade.Student.last_names}`,
          subject: noteBySubjectAndGrade.Subject.name,
          grade:
            noteBySubjectAndGrade.Student.Students_from_Courses[0].course.grade
              .gradeNumber,
          note: noteBySubjectAndGrade.note,
        };
      }
    );
    return getNoteBySubjectAndGradeFormat;
  };

  // TIENE ERRROR!!
  // filtrar las notas por profesor = -> route /notes/teacher/:id
  static getNotesByTeacher = async (teacherManager) => {
    logger("Enviando listado de Notas por docente");
    const getNoteByTeacher = await prisma.subject_Note_for_Student.findMany({
      where: {
        Student: {
          Students_from_Courses: {
            every: {
              course: {
                teacherManager,
              },
            },
          },
        },
      },
      select: {
        Student: {
          select: {
            names: true,
            last_names: true,
            Students_from_Courses: {
              select: {
                course: {
                  select: {
                    grade: {
                      select: {
                        gradeNumber: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        Subject: {
          select: {
            name: true,
            Subjects__from_Teachers: {
              select: {
                teacher: {
                  select: {
                    names: true,
                    last_names: true,
                  },
                },
              },
            },
          },
        },
        note: true,
      },
    });
    return getNoteByTeacher;
  };

  // filtrar las notas por materia y estudiante -> route /notes/subject-student/:id?subjectId=2

  static getNotesBySubjectAndStudent = async (studentId, subjectId) => {
    logger("Enviando listado de notas por materia y estudiante");
    const getNotesBySubjectAndStudent =
      await prisma.subject_Note_for_Student.findMany({
        where: {
          studentId,
          subjectId,
        },
        select: {
          Student: {
            select: {
              names: true,
              last_names: true,
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
    //return getNotesBySubjectAndStudent;
    const getNotesBySubjectAndStudentFormat = getNotesBySubjectAndStudent.map(
      (noteByStudentAndGrade) => {
        return {
          student: `${noteByStudentAndGrade.Student.names} ${noteByStudentAndGrade.Student.last_names}`,
          subject: noteByStudentAndGrade.Subject.name,
          note: noteByStudentAndGrade.note,
        };
      },
    );
    return getNotesBySubjectAndStudentFormat;
  };

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

  static averageNoteforSubejectCourse = async (subjectId, courseId) => {
    logger("Se ha enviado el promedio de nota de una materia por curso");
    const averageNote = await prisma.subject_Note_for_Student.aggregate({
      _avg: {
        note: true,
      },
      where: {
        subjectId,
        
        Student: {
          
          Students_from_Courses: {
            every:{
            courseId,
          },
        },
        },
      },
    });
    return averageNote;
  };
}

module.exports = notesService;
