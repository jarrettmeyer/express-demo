'use strict';
const hashPassword = require('./hashPassword');

function setUserHashedPassword(userData) {
  userData.hashedPassword = hashPassword(userData.clearPassword);
  return userData;
}


module.exports = setUserHashedPassword;
