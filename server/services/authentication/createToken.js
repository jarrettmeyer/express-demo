'use strict';

const debug = require('debug')('server');
const getTokenSecret = require('./getTokenSecret');
const jwt = require('jwt-simple');
const _  = require('lodash');

const defaults = {
  expiresDays: 28,
  now: new Date()
};

module.exports = (email, options) => {
  options = _.defaults(options, defaults);
  if (email.email) { // Probably sent a user object instead.
    email = email.email;
  }
  let secret = getTokenSecret();
  let tokenBody = {
    email: email,
    issued: options.now.getTime(),
    expires: options.now.getTime() + addDays(options.expiresDays)
  };
  let token = jwt.encode(tokenBody, secret);
  debug(`Created new token for user ${email}.`);
  return token;
};

function addDays(days) {
  return days * 24 * 60 * 60 * 1000;
}
