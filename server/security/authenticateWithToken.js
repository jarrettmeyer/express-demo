'use strict';

const debug = require('debug')('server');
const services = require('../services');
const HttpError = require('../errors').HttpError;

const decodeToken = services.authentication.decodeToken;
const users = services.users;


function getParts(string) {
  let parts = string.split(' ');
  return parts.reduce((previous, current) => {
    if (current && current.length > 0) {
      previous.push(current);
    }
    return previous;
  }, []);
}


function checkAuthorization(request) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    debug('No authorization header attached to request.');
    return { authorized: false };
  }
  let authHeaderParts = getParts(authHeader);
  let token = authHeaderParts[1];
  if (!token) {
    debug(`No token included in authorization header.`);
    return { authorized: false };
  }
  let decodedToken = decodeToken(token);
  if (Date.now() > decodedToken.expires) {
    debug(`Unable to use token. Token has expired.`);
    return { authorized: false };
  }
  debug(`Decoded token: ${JSON.stringify(decodedToken)}`);
  return { authorized: true, decodedToken: decodedToken };
}


function verifyUser(user, auth) {
  if (!user) {
    debug(`No user found with email ${auth.decodedToken.email}.`);
    return { verified: false };
  }
  if (!user.tokenIssuedAt) {
    debug(`User ${user.email} does not have an active token issued.`);
    return { verified: false };
  }
  if (user.removed) {
    debug(`User ${user.email} has been removed. Unabled to validate token.`);
    return { verified: false };
  }
  return { verified: true };
}


function verifyTokenTime(user, auth) {
  let userTime = user.tokenIssuedAt.getTime();
  let tokenTime = auth.decodedToken.issued;
  if (userTime !== tokenTime) {
    debug(`Token timestamp is not valid.`);
    debug(`User time: ${new Date(userTime)}. Token time: ${new Date(tokenTime)}.`);
    return { verified: false };
  }
  return { verified: true };
}


function unauthorized() {
  return new HttpError(401, 'Unauthorized');
}


function onUserFound(request, user, auth, next) {
  let verification = verifyUser(user, auth);
  if (!verification.verified) {
    return next(unauthorized());
  }
  let tokenTimeVerification = verifyTokenTime(user, auth);
  if (!tokenTimeVerification.verified) {
    return next(unauthorized());
  }
  request.user = user;
  debug(`\u2714 Verified token. Current user: ${request.user.email}`);
  return next();
}


function authenticateWithToken(request, response, next) {
  let auth = checkAuthorization(request);
  if (!auth.authorized) {
    return next(unauthorized());
  }
  return users.findByEmail(auth.decodedToken.email)
    .then(user => {
      return onUserFound(request, user, auth, next);
    });
}


module.exports = authenticateWithToken;
