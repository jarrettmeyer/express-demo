"use strict";

const getTokenSecret = require('./getTokenSecret');
const jwt = require('jwt-simple');

module.exports = (token) => {
  let secret = getTokenSecret();
  let decoded = jwt.decode(token, secret);
  return decoded;
};
