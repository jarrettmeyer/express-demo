var createToken = require('../../services/authentication/createToken');
var users = require('../../services/users');
var _ = require('lodash');

module.exports = (email, now) => {
  if (!email) {
    throw new Error('Cannot create token without an email address.');
  }
  return users.findByEmail(email)
    .then(user => {
      if (!user) {
        throw new Error(`No user could be found with email ${email}.`)
      }
      if (!user.tokenIssuedAt) {
        throw new Error(`Cannot create token for user ${email}. Fixture does not have a value for tokenIssuedAt.`);
      }
      return `Token: ${createToken({ email: user.email }, now || user.tokenIssuedAt)}`;
    });
};
