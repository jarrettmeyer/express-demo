'use strict';
const toUserJson = require('./toUserJson');
const User = require('../../models/User');

module.exports = function (request, response) {
  return User.findAll()
    .then(users => {
      return response.status(200).json({ users: users.map(toUserJson) });
    });
};
