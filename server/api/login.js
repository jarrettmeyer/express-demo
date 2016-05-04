'use strict';
const ActivityLog = require('../models/ActivityLog');
const checkCredentials = require('../services/checkCredentials');
const createToken = require('../services/createToken');
const debug = require('debug')('server');
const errors = require('../errors');
const updateUserTokenIssuedAt = require('../services/updateUserTokenIssuedAt');

const HttpBadRequest = errors.HttpBadRequest;
const HttpError = errors.HttpError;

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
  let now = new Date(), token = null, user = null;
  debug(`Authenticating user: ${credentials.email}.`);
  return checkCredentials(credentials)
    .then(_user => {
      user = _user;
      return createToken(user.email, { now: now });
    })
    .then(_token => {
      token = _token;
      return updateUserTokenIssuedAt(user.id, now);
    })
    .then(() => {
      let activityLogSpec = {
        refType: 'user',
        refId: user.id,
        description: 'login',
        userId: user.id,
        createdAt: new Date()
      };
      return ActivityLog.create(activityLogSpec);
    })
    .then(() => {
      return res.status(200).json({ token: token });
    })
    .catch(errors.InvalidCredentials, error => {
      return next(new HttpError(401, error.message));
    });
};
