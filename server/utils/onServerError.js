const getPipeOrPort = require('./getPipeOrPort');

module.exports = function (server) {
  return function (error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const bind = getPipeOrPort(server);

    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges.`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use.`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
};
