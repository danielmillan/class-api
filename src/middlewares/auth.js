const jwt = require('jsonwebtoken');
const debug = require('debug');

//logger
const logger = debug('class-api:AuthMiddlewares');

class AuthMiddlewares {
  static validToken(request, response, next) {
    const authorizationHeader = request.headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      jwt.verify(
        token,
        process.env.JWT_SECRET_PRIVATE_KEY,
        (err, decodedData) => {
          if (err) {
            logger('jwt failed, a reason is: %s', err.message);
            response.status(401).send('No tiene permisos para esta acción');
          } else {
            response.locals.user = decodedData;
            next();
          }
        }
      );
    } else {
      response.status(401).send('No tiene permisos para esta acción');
    }
  }
}

module.exports = AuthMiddlewares;
