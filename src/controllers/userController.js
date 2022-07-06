const { Router } = require('express');
const UserService = require('../services/userService');
const AuthUtilities = require('../utilities/auth');

const userController = Router();

userController.get('/', async (request, response) => {
  const resultService = await UserService.listUsers();
  response.send(resultService);
});

userController.get('/:id', async (request, response) => {
  const userId = Number(request.params.id);
  const resultService = await UserService.findUserById(userId);
  response.send(resultService);
});

userController.post('/', async (request, response) => {
  const teacher = {
    names: request.body.names,
    last_names: request.body.last_names,
    email: request.body.email,
    password: await AuthUtilities.generateHash(request.body.password),
  };
  const resultService = await UserService.createUser(teacher);
  response.send(resultService);
});

userController.put('/:id', async (request, response) => {
  const user = {
    names: request.body.names,
    last_names: request.body.last_names,
    email: request.body.email,
    password: request.body.password,
  };
  const userId = Number(request.params.id);
  const resultService = await UserService.editUser(userId, user);
  response.send(resultService);
});

userController.delete('/:id', async (request, response) => {
  const userId = Number(request.params.id);
  const resultService = await UserService.deleteUser(userId);
  response.send(resultService);
});

module.exports = userController;
