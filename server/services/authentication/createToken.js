'use strict';

const debug = require('debug')('server');
const getTokenSecret = require('./getTokenSecret');
const jwt = require('jwt-simple');

module.exports = (user, now) => {
  now = now || new Date();
  let secret = getTokenSecret();
  let tokenBody = {
    email: user.email,
    issued: now.getTime(),
    expires: now.getTime() + addDays(28)
  };
  // debug(`Token body: ${JSON.stringify(tokenBody)}`);
  let token = jwt.encode(tokenBody, secret);
  return token;
};

function addDays(days) {
  return days * 24 * 60 * 60 * 1000;
}
