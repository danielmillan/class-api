// agregar el middleware para permitir Crear, actualizar y eliminar solamente al rol "Admin", si no mostrar un mensaje generico
const debug = require('debug');

//logger
const logger = debug('class-api:AuthMiddlewares');

class RoleMiddlewares {
  static validRole(request, response, next) {
    const roleValue = Number(response.locals.user.roleId);
    logger(roleValue);
    if (roleValue == 1) {
      response.status(200);
      next();
    } else {
      response.status(401).send('No tiene permisos para esta acción.');
    }
  }
}

module.exports = RoleMiddlewares;
