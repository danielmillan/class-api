const debug = require('debug');
const prisma = require('../prisma/client');

//logger
const logger = debug('class-api:roleService');

class RoleService {
    static async validateRole () {
        const roleMatch = await prisma.user.findUnique({
            
        })
    }
}
module.exports = RoleService;