const debug = require('debug');
const prisma = require('../prisma/client');

//logger
const logger = debug('class-api:User');

class UserService {
  static listUsers = async () => {
    logger('Obteniendo listado de usuarios');
    const listUsers = await prisma.user.findMany({
      where: {
        deleted: false,
      },
      select: {
        id: true,
        names: true,
        last_names: true,
        Role:{
          select:{
            name:true,
          },
        },
        email: true,
        created_at: true,
        updated_at: true,
        status: true,
      },
    });
    return listUsers;
  };

  static findUserById = async (id) => {
    logger('Obteniendo usuario por el id: %s', id);
    const userMatch = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        names: true,
        last_names: true,
        Role:{
          select:{
            name:true,
          },
        },
        email: true,
        created_at: true,
        updated_at: true,
        status: true,
      },
    });
    return userMatch;
  };

  static createUser = async (user) => {
    logger('Creando el usuarios %s', user.names);
    await prisma.user.create({
      data: user,
    });
    return 'Se ha creado el usuario';
  };

  static editUser = async (id, user) => {
    logger('actualizando el usuario con id %s', id);
    await prisma.user.update({
      where: {
        id,
      },
      data: user,
    });
    return 'Se ha editado el usuario';
  };

  static deleteUser = async (id) => {
    logger('eliminando el usuario con id %s', id);
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });
    return 'Se ha eliminado el usuario';
  };
}

module.exports = UserService;
