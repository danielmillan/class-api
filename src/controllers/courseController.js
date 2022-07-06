const { Router } = require('express');
const CourseService = require('../services/courseService');

const courseController = Router();

courseController.get('/students/:id', async (request, response) => {
  const courseId = Number(request.params.id);
  const resultService = await CourseService.getStudentsByCourse(courseId);
  response.send(resultService);
});

courseController.post('/register', async (request, response) => {
  const course = {
    courseNumber: Number(request.body.courseNumber),
    gradeId: request.body.gradeId,
    teacherManager: request.body.teacherManager,
  };
  const resultService = await CourseService.createCourse(course);
  response.send(resultService);
});

courseController.get('/', async (request, response) => {
  const resultService = await CourseService.listCourses();
  response.send(resultService);
});

courseController.put('/:id', async (request, response) => {
  const id = Number(request.params.id);
  const course = {
    courseNumber: Number(request.body.courseNumber),
    gradeId: request.body.gradeId,
    teacherManager: request.body.teacherManager,
  };
  const resultService = await CourseService.editCourse(id, course);
  response.send(resultService);
});

module.exports = courseController;
