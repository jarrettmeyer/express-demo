const debug = require('debug')('server');
const getPipeOrPort = require('./getPipeOrPort');

module.exports = function (server) {
  return function () {
    const bind = getPipeOrPort(server);
    debug(`Server is listening on ${bind}.`);
  };
};
