const http = require('http');
const debug = require('debug');
const app = require('./app');

//logger
const logger = debug('class-api:server');
const port = 8090;

app.set('port', port);
const server = http.createServer(app);

server.listen(port);

server.on('error', (error) => {
  switch (error.code) {
    case 'EACCES':
      logger('no tiene los privilegios');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

// servidor en ejecucion
server.on('listening', () => {
  logger('servidor arriba en el puerto:', port);
});
