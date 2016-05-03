'use strict';
const debug = require('debug')('server');
const getTokenSecret = require('./helpers/getTokenSecret');
const jwt = require('jwt-simple');
const _  = require('lodash');


const defaults = {
  expiresDays: 28,
  now: new Date()
};


function addDays(days) {
  return days * 24 * 60 * 60 * 1000;
}


function createTokenBody(email, options) {
  return {
    email: email,
    issued: options.now.getTime(),
    expires: options.now.getTime() + addDays(options.expiresDays)
  };
}


function createToken(email, options) {
  options = _.defaults(options, defaults);
  if (email.email) { // Probably sent a user object instead.
    email = email.email;
  }
  let secret = getTokenSecret();
  let tokenBody = createTokenBody(email, options);
  let token = jwt.encode(tokenBody, secret);
  debug(`Created new token for user ${email}.`);
  return token;
}

module.exports = createToken;
