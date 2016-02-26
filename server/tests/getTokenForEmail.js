var createToken = require('../services/authentication/createToken');

module.exports = (email) => {
  return `Token: ${createToken({ email: email })}`;
};
