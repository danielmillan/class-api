const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthUtilities {
  static generateHash(text) {
    return new Promise(async (resolve, reject) => {
      try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(text, salt);
        resolve(hash);
      } catch (error) {
        reject(error);
      }
    });
  }

  static compareHash(text, hash) {
    return new Promise(async (resolve, reject) => {
      try {
        const resultComparition = await bcrypt.compare(text, hash);
        resolve(resultComparition);
      } catch (error) {
        reject(error);
      }
    });
  }

  static async signToken(data, timeExpired) {
    return new Promise((resolve, reject) => {
      try {
        const token = jwt.sign(data, process.env.JWT_SECRET_PRIVATE_KEY, {
          expiresIn: timeExpired,
        });
        resolve(token);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = AuthUtilities;
