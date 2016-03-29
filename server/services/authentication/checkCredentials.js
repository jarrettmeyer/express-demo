"use strict";
const comparePassword = require('./comparePassword');
const errors = require('../../errors');
const users = require('../users');
const _ = require('lodash');

module.exports = function (credentials) {
  credentials = _.defaults(credentials, { email: null, password: null });
  let returnValue = null;
  return users.findByEmail(credentials.email)
    .then(function (user) {
      if (!user || user.removed) {
        throw new errors.InvalidCredentials();
      }
      let isCorrectPassword = comparePassword(credentials.password, user.hashedPassword);
      if (!isCorrectPassword) {
        throw new errors.InvalidCredentials();
      }
      return user;
    });
};
