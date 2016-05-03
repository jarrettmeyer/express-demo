'use strict';
const User = require('../models/User');


function updateUserTokenIssuedAt(userId, now) {
  now = now || new Date();
  return User.update({
    tokenIssuedAt: now
  }, {
    where: { id: userId }
  })
}


module.exports = updateUserTokenIssuedAt;
