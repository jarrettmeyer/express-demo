const users = require('../../services').users;

module.exports = (request, response, next) => {
  return users.findAllOwners()
    .then(owners => {
      return response.status(200).json({ owners: owners });
    });
};
