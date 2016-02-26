'use strict';

const services = require('../services');

const decodeToken = services.authentication.decodeToken;
const users = services.users;

/**
 */
module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).send('Unauthorized');
  }
  let authHeaderParts = getParts(authHeader)
  let token = authHeaderParts[1];
  let decodedToken = decodeToken(token);
  return users.findByEmail(decodedToken.email)
    .then(function (user) {
      req.user = user;
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