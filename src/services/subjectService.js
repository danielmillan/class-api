const debug = require('debug');
const subjects = [];

//logger
const logger = debug('class-api:subjects');

class SubjectService {
  static listaMaterias = () => {
    logger('Se ha enviado el listado de materias');
    return subjects;
  };

  static crearMaterias = (materia) => {
    subjects.push(materia);
    logger('Se ha creado al materia ', materia);
    return 'Se ha creado la materia';
  };

  static editarMateria = (materia) => {
    const indexOfMateria = subjects.indexOf(
      subjects.find((mate) => mate.id === materia.id)
    );

    if (indexOfMateria >= 0) {
      subjects[indexOfMateria] = materia;
      logger('Se ha editado la materia', subjects[indexOfMateria].nombre);
      return 'Se ha editado la materia';
    } else {
      return 'No se ha encontrado la materia';
    }
  };

  static eliminarMateria = (id) => {
    const indexOfMateria = subjects.indexOf(
      subjects.find((mate) => mate.id === id)
    );

    if (indexOfMateria >= 0) {
      subjects.splice(indexOfMateria, 1);
      return 'Se ha eliminado la materia';
    } else {
      return 'No se ha encontrado la materia';
    }
  };
}

module.exports = SubjectService;
