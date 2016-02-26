"use strict";
const getTokenSecret = require('./getTokenSecret');
const jwt = require('jwt-simple');

module.exports = (user) => {
  let secret = getTokenSecret();
  let token = jwt.encode({ email: user.email }, secret);
  return token;
};
