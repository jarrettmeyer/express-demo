const bcrypt = require('bcrypt');
const _ = require('lodash');


const defaults = {
  complexity: 10
};


module.exports = function (clearPassword, options) {
  options = _.defaults(options, defaults);
  const salt = bcrypt.genSaltSync(options.complexity);
  const hashedPassword = bcrypt.hashSync(clearPassword, salt);
  return hashedPassword;
};
