const users = require('../../services').users;

module.exports = function (req, res, next) {
  return users.findAll()
    .then(users => {
      return res.json({ users: users });
    });
};
