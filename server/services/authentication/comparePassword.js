const bcrypt = require('bcrypt');

module.exports = function (clearPassword, hashedPassword) {
  return bcrypt.compareSync(clearPassword, hashedPassword);
}
