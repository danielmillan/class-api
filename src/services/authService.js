const debug = require('debug');
const prisma = require('../prisma/client');
const AuthUtilities = require('../utilities/auth');

//logger
const logger = debug('class-api:User');

class AuthService {
  static async authenticateUser(email, password) {
    const userMatch = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userMatch) {
      if (await AuthUtilities.compareHash(password, userMatch.password)) {
        const payload = {
          id: userMatch.id,
          names: userMatch.names,
          last_names: userMatch.last_names,
          email: userMatch.email,
        };
        const token = AuthUtilities.signToken(payload, '5m');
        return token;
      } else {
        ('Credenciales incorrectas');
      }
    } else {
      return 'Credenciales incorrectas';
    }
  }
}

module.exports = AuthService;
