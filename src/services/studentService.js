const debug = require('debug');
const prisma = require('../prisma/client');

//logger
const logger = debug('class-api:students');

class StudentService {
  static listaEstudiantes = async () => {
    logger('Obteniendo listado de estudiantes');
    const listStudents = await prisma.students.findMany({
      where: {
        deleted: false,
      },
    });
    return listStudents;
  };

  static buscarEstudiantePorId = async (id) => {
    logger('Obteniendo listado de estudiantes');
    const listStudents = await prisma.students.findUnique({
      where: {
        id,
      },
    });
    return listStudents;
  };

  static crearEstudiante = async (estudiante) => {
    logger('Creando el estudiante %s', estudiante.names);
    await prisma.students.create({
      data: estudiante,
    });
    return 'Se ha creado el estudiante';
  };

  static editarEstudiante = async (id, estudiante) => {
    logger('actualizando el estudiante con id %s', id);
    await prisma.students.update({
      where: {
        id,
      },
      data: estudiante,
    });
    return 'Se ha editado el estudiante';
  };

  static eliminarEstudiante = async (id) => {
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
}

module.exports = StudentService;
