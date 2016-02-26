const users = require('../../services').users;

module.exports = function (req, res, next) {
  return users.findAll()
    .then((result) => {
      return res.json(result);
    });
};
