// agregar el middleware para permitir Crear, actualizar y eliminar solamente al rol "Admin", si no mostrar un mensaje generico
const debug = require('debug');
const roles = require('../models/roles');
const prisma = require('../prisma/client');

//logger
const logger = debug('class-api:RoleMiddlewares');

class RoleMiddlewares {
  static async validRole(request, response, next) {
    const roleValue = response.locals.user.role;
    const roleValidation = await prisma.roles.findFirst({
      where: {
        name: roleValue,
      },
    });
    if (roleValidation.name === roles.ADMIN) {
      next();
    } else {
      response.status(401).send('No tiene permisos para esta acción.');
    }
  }
}

module.exports = RoleMiddlewares;
