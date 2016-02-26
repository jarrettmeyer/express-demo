"use strict";

const debug = require('debug')('server');
const getTokenSecret = require('./getTokenSecret');
const jwt = require('jwt-simple');

module.exports = (token) => {
  let secret = getTokenSecret();
  let decoded = jwt.decode(token, secret);
  debug(`decoded user token: ${decoded}`);
  return decoded;
};
