'use strict';

const debug = require('debug')('server');
const errors = require('../errors');
const services = require('../services');

const HttpBadRequest = errors.HttpBadRequest;

module.exports = function (req, res, next) {
  let credentials = req.body;
  if (!credentials.email) {
    debug('Credentials does not have an email property.');
    return next(new HttpBadRequest());
  }
  if (!credentials.password) {
    debug('Credentials does not have a password property.');
    return next(new HttpBadRequest());
  }
  let now = new Date();
  let token = null;
  let user = null;
  debug(`Authenticating user: ${credentials.email}.`);
  return services.authentication.checkCredentials(credentials)
    .then((_user) => {
      user = _user;
      return services.authentication.createToken(user.email, { now: now });
    })
    .then((_token) => {
      token = _token;
      return services.users.updateTokenIssuedAt(user.id, now);
    })
    .then(() => {
      return res.status(200).json({ token: token });
    })
    .catch(errors.InvalidCredentials, (error) => {
      return res.status(401).json(error.message);
    });
};
