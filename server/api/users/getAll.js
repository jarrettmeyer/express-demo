'use strict';
const User = require('../../models/User');

module.exports = function (request, response) {
  return User.findAll()
    .then(users => {
      console.log('users:', users);
      return response.status(200).json({ users: users });
    });
};
