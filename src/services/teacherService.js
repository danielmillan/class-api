const debug = require('debug');
const prisma = require('../prisma/client');

//logger
const logger = debug('class-api:teachers');

class TeacherService {
  static listTeachers = async () => {
    logger('Obteniendo listado de docentes');
    const listTeachers = await prisma.teachers.findMany({
      where: {
        deleted: false,
      },
    });
    return listTeachers;
  };

  static findTeacherById = async (id) => {
    logger('Obteniendo listado de estudiantes');
    const listTeachers = await prisma.teachers.findUnique({
      where: {
        id,
      },
    });
    return listTeachers;
  };

  static createTeacher = async (teacher) => {
    logger('Se ha agregado el docente %s', teacher.names);
    await prisma.teachers.create({
      data: teacher,
    })
    return 'Se ha creado el docente';
  };

  static editTeacher = async (id, teacher) => {
    logger('actualizando el docente con id %s', id);
    await prisma.teachers.update({
      where: {
        id,
      },
      data: teacher,
    });
    return 'Se ha editado el docente';
  };

  static deleteTeacher = async (id) => {
    logger('eliminando el docente con id %s', id);
    await prisma.teachers.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });
    return 'Se ha eliminado el estudiante';
  };
}

module.exports = TeacherService;
