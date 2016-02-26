const isString = require('./isString');

module.exports = function (server) {
  const addr = server.address();
  const bind = isString(addr) ? 'pipe ' + addr : 'port ' + addr.port;
  return bind;
}
