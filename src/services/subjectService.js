const prisma = require('../prisma/client');
const debug = require('debug');

//logger
const logger = debug('class-api:subjects');

class SubjectService {
  static listSubjects = async () => {
    logger('Se ha enviado el listado de materias');
    const listSubjects = await prisma.subjects.findMany();
    return listSubjects;
  };

  static findSubjectById = async (id) => {
    const listSubjects = await prisma.subjects.findUnique({
      where: {
        id,
      },
    });
    return listSubjects;
  };

  static createSubjects = async (subject) => {
    logger('Creando la materia %s', subject.name);
    await prisma.subjects.create({
      data: subject,
    });
    return 'Se ha creado la materia';
  };

  static editSubject = async (id, subject) => {
    logger('actualizando la materia con id %s', id);
    await prisma.subjects.update({
      where: {
        id,
      },
      data: subject,
    });
    return 'Se ha editado la materia';
  };

  static deleteSubject = async (id) => {
    logger('eliminando materia con id %s', id);
    await prisma.subjects.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });
    return 'Se ha eliminado la materia';
  };

  // Listar las materias por profesor (id)
}

module.exports = SubjectService;
