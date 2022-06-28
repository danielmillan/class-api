const debug = require('debug');
const prisma = require('../prisma/client');

//logger
const logger = debug('class-api:courseService');

class CourseService {
  // Agregar el CRU para cursos
  static createCourse = async (course) => {
    logger('Creando el curso %d', course.courseNumber);
    await prisma.courses.create({
      data: course,
    });
    return 'Se ha creado el curso'
  }

  static listCourses = async () => {
    logger ('Se ha enviado el listado de cursos');
    const listCourses = await prisma.courses.findMany({
    });
    logger('retorno');
    return listCourses;
    
  }

  static editCourse = async (id, course) => {
    logger('Editando curso');
    const editCourse = await prisma.courses.update({
      where: {
        id
      },
      data: course,
    });
    logger('Se ha ediado el curso');
  }

  static getStudentsByCourse = async (courseId) => {
    logger('Buscando estudiantes par el curso: %s', courseId);
    const listStudentsByCourse = await prisma.students_from_Courses.findMany({
      where: {
        courseId,
      },
      select: {
        student: {
          select: {
            names: true,
            last_names: true,
          },
        },
        course: {
          select: {
            grade: {
              select: {
                alias: true,
                gradeNumber: true,
              },
            },
            courseNumber: true,
          },
        },
      },
    });
    return listStudentsByCourse;
  };
}

module.exports = CourseService;
