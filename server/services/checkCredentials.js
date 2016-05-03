'use strict';
const comparePassword = require('./helpers/comparePassword');
const errors = require('../errors');
const User = require('../models/User');
const _ = require('lodash');


function onUserFound(credentials, user) {
  if (!user || user.removed) {
    throw new errors.InvalidCredentials();
  }
  let isCorrectPassword = comparePassword(credentials.password, user.hashedPassword);
  if (!isCorrectPassword) {
    throw new errors.InvalidCredentials();
  }
  return user;
}


function checkCredentials(credentials) {
  credentials = _.defaults(credentials, { email: null, password: null });
  return User.findOneByEmail(credentials.email)
    .then(onUserFound.bind(null, credentials));
}


module.exports = checkCredentials;
