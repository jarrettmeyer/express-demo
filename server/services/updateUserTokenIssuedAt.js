'use strict';
const User = require('../models/User');


function updateUserTokenIssuedAt(userId, now) {
  let spec = {
    tokenIssuedAt: now || new Date()
  };
  let criteria = {
    where: {
      $and: [
        { id: userId },
        { removed: false }
      ]
    }
  };
  return User.update(spec, criteria)
    .then(affected => {
      return affected[0];
    });
}


module.exports = updateUserTokenIssuedAt;
