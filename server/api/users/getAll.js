const users = require('../../services').users;

module.exports = function (req, res) {
  return users.findAll()
    .then(users => {
      return res.json({ users: users });
    });
};
