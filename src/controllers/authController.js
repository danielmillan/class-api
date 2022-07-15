const { Router } = require('express');
const AuthService = require('../services/authService');

const authController = Router();

authController.post('/', async (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
  const resultService = await AuthService.authenticateUser(email, password);
  response.send(resultService);
});

module.exports = authController;
