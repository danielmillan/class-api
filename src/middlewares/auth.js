const jwt = require('jsonwebtoken');
const debug = require('debug');

//logger
const logger = debug('class-api:AuthMiddlewares');
let roleVal = 0;
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
            //roleVal = response.locals.user.roleId;
            //console.log(roleVal)
           //console.log(response.locals.user.roleId);
            next();
          }
        }
      );
    } else {
      response.status(401).send('No tiene permisos para esta acción,Paila');
    }
  }
}

module.exports = AuthMiddlewares;

