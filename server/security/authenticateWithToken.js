'use strict';

const debug = require('debug')('server');
const services = require('../services');

const decodeToken = services.authentication.decodeToken;
const users = services.users;

/**
 */
module.exports = function (request, response, next) {
  const authHeader = request.headers['authorization'];
  if (!authHeader) {
    return response.status(401).send('Unauthorized');
  }
  let authHeaderParts = getParts(authHeader)
  let token = authHeaderParts[1];
  let decodedToken = decodeToken(token);
  return users.findByEmail(decodedToken.email)
    .then(function (user) {
      request.user = user;
      debug(`Current user: ${request.user.email}`);
      return next();
    });
};

function getParts(string) {
  let parts = string.split(' ');
  return parts.reduce((previous, current) => {
    if (current && current.length > 0) {
      previous.push(current);
    }
    return previous;
  }, []);
}
