'use strict';

const createToken = require('../../services/authentication/createToken');
const users = require('../../../fixtures/users');
const _ = require('lodash');

const defaults = {
  expiresDays: 999999
};

module.exports = (email, options) => {
  options = _.defaults(options, defaults);
  if (!email) {
    throw new Error('Cannot create token without an email address.');
  }
  let user = _.find(users, { email: email });
  if (!user) {
    throw new Error(`No user could be found with email ${email}.`);
  }
  if (!user.tokenIssuedAt) {
    throw new Error(`Cannot create token for user ${email}. Fixture does not have a value for tokenIssuedAt.`);
  }
  if (!options.now) {
    options.now = user.tokenIssuedAt;
  }
  return `Token: ${createToken(user, options)}`;
};
