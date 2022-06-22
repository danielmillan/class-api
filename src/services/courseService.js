const debug = require('debug');
const prisma = require('../prisma/client');

//logger
const logger = debug('class-api:courseService');

class CourseService {
  // Agregar el CRU para cursos

  static getStudentsByCourse = async (courseId) => {
    logger('buscando estudiantes par el curso: %s', courseId);
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
