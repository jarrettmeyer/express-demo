'use strict';
const setUserHashedPassword = require('./helpers/setUserHashedPassword');
const User = require('../models/User');


function createUser(userSpec) {
  setUserHashedPassword(userSpec);
  return User.create(userSpec);
}


module.exports = createUser;
