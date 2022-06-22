const { Router } = require('express');
const CourseService = require('../services/courseService');

const courseController = Router();

courseController.get('/students/:id', async (request, response) => {
  const courseId = Number(request.params.id);
  const resultService = await CourseService.getStudentsByCourse(courseId);
  response.send(resultService);
});

module.exports = courseController;
