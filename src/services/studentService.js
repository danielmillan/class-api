const debug = require('debug');

const students = [];

//logger
const logger = debug('class-api:students');

class StudentService {
  static listaEstudiantes = (students) => {
    logger('Se ha enviado el listado de estudiantes');
    return students;
  };

  static crearEstudiante = (estudiante) => {
    students.push(estudiante);
    logger('Se ha creado el estudiante', estudiante);
    return 'Se ha creado el estudiante';
  };

  static editarEstudiante = (estudiante) => {
    const indexOfStudent = students.indexOf(
      students.find((stud) => stud.id === estudiante.id)
    );
    if (indexOfStudent >= 0) {
      students[indexOfStudent] = estudiante;
      logger('Se ha editado el estduiante', students[indexOfStudent].nombre);
      return 'Se ha editado el estudiante';
    } else {
      return 'No se ha encontrado el estudiante';
    }
  };

  static eliminarEstudiante = (id) => {
    const indexOfStudent = students.indexOf(
      students.find((stud) => stud.id === id)
    );
    if (indexOfStudent >= 0) {
      students.splice(indexOfStudent, 1);
      logger('Se ha eliminado el estudiante', students[indexOfStudent].nombre);
      return 'Se ha editado el estudiante';
    } else {
      return 'No se ha encontrado el estudiante';
    }
  };
}

module.exports = StudentService;
