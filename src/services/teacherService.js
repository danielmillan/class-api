const debug = require('debug');

const docentes = [];

//logger
const logger = debug('class-api:teachers');

class TeacherService {
  static listaDocentes = (docentes) => {
    logger('Se ha enviado el listado de docentes');
    return docentes;
  };

  static crearDocente = (docente) => {
    docentes.push(docente);
    logger('Se ha agregado el docente', docente);
    return 'Se ha creado el docente';
  };

  static editarDocente = (docente) => {
    const indexOfDocente = docentes.indexOf(
      docentes.find((don) => don.id === docente.id)
    );
    if (indexOfDocente >= 0) {
      docentes[indexOfDocente] = docente;
      logger('Se ha editado el docente', docente);
      return 'El docente se ha actualizado';
    } else {
      return 'No se ha encontrado el docente';
    }
  };

  static eliminarDocente = (id) => {
    const indexOfDocente = docentes.indexOf(
      docentes.find((don) => don.id === id)
    );
    logger(indexOfDocente);
    if (indexOfDocente >= 0) {
      docentes.splice(indexOfDocente, 1);
      logger('Se ha eliminado el docente');
      return 'El docente se ha eliminado';
    } else {
      return 'No se ha encontrado el docente';
    }
  };
}

module.exports = TeacherService;
