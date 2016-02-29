var createToken = require('../../services/authentication/createToken');

module.exports = (email) => {
  if (!email) {
    throw new Error('Cannot create token without an email address.');
  }
  return `Token: ${createToken({ email: email })}`;
};
