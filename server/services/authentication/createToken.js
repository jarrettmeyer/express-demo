'use strict';

const getTokenSecret = require('./getTokenSecret');
const jwt = require('jwt-simple');

module.exports = (user, now) => {
  now = now || new Date();
  let secret = getTokenSecret();
  let token = jwt.encode({
    email: user.email,
    issued: now.getTime(),
    expires: now.getTime() + addDays(28)
  }, secret);
  return token;
};

function addDays(days) {
  return days * 24 * 60 * 60 * 1000;
}
