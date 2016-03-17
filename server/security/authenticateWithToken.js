'use strict';

const debug = require('debug')('server');
const services = require('../services');
const HttpError = require('../errors').HttpError;

const decodeToken = services.authentication.decodeToken;
const users = services.users;

/**
 */
module.exports = function (request, response, next) {
  const authHeader = request.headers['authorization'];
  if (!authHeader) {
    debug('No authorization header attached to request.');
    return next(unauthorized());
  }
  let authHeaderParts = getParts(authHeader)
  let token = authHeaderParts[1];
  if (!token) {
    debug(`No token included in authorization header.`);
    return next(unauthorized());
  }
  let decodedToken = decodeToken(token);
  if (Date.now() > decodedToken.expires) {
    debug(`Unable to use token. Token has expired.`);
    return next(unauthorized());
  }
  debug(`Decoded token: ${JSON.stringify(decodedToken)}`);
  return users.findByEmail(decodedToken.email)
    .then(function (user) {
      if (!user) {
        debug(`No user found with email ${decodedToken.email}.`);
        return next(unauthorized());
      }
      if (!user.tokenIssuedAt) {
        debug(`User ${user.email} does not have an active token issued.`);
        return next(unauthorized());
      }
      if (user.removed) {
        debug(`User ${user.email} has been removed. Unabled to validate token.`);
        return next(unauthorized());
      }
      let userTime = user.tokenIssuedAt.getTime();
      let tokenTime = decodedToken.issued;
      if (userTime !== tokenTime) {
        debug(`Token timestamp is not valid.`);
        debug(`User time: ${new Date(userTime)}. Token time: ${new Date(tokenTime)}.`);
        return next(new HttpError(401, 'Unauthorized'));
      }
      request.user = user;
      debug(`\u2714 Verified token. Current user: ${request.user.email}`);
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

function unauthorized() {
  return new HttpError(401, 'Unauthorized');
}
