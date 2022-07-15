const debug = require('debug');
const prisma = require('../prisma/client');

//logger
const logger = debug('class-api:students');

class StudentService {
  static listStudents = async () => {
    logger('Obteniendo listado de estudiantes');
    const listStudents = await prisma.students.findMany({
      where: {
        deleted: false,
      },
    });
    return listStudents;
  };

  static findStudentById = async (id) => {
    logger('Obteniendo listado de estudiantes');
    const listStudents = await prisma.students.findUnique({
      where: {
        id,
      },
    });
    return listStudents;
  };

  static createStudent = async (student) => {
    logger('Creando el estudiante %s', student.names);
    await prisma.students.create({
      data: student,
    });
    return 'Se ha creado el estudiante';
  };

  static editStudent = async (id, student) => {
    logger('actualizando el estudiante con id %s', id);
    await prisma.students.update({
      where: {
        id,
      },
      data: student,
    });
    return 'Se ha editado el estudiante';
  };

  static deleteStudent = async (id) => {
    logger('eliminando el estudiante con id %s', id);
    await prisma.students.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });
    return 'Se ha eliminado el estudiante';
  };

  static registerStudentInACourse = async (studentId, courseId) => {
    logger('registrando el estudiante %s al curso %s:', studentId, courseId);
    await prisma.students_from_Courses.create({
      data: { studentId, courseId },
    });
    return 'Estudiante matriculado al curso';
  };
}

module.exports = StudentService;
