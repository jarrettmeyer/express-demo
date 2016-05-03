'use strict';
const ActivityLog = require('../models/ActivityLog');
const setUserHashedPassword = require('./helpers/setUserHashedPassword');
const User = require('../models/User');


function createActivityLog(user, opts) {
  let activityLogSpec = {
    refType: 'user',
    refId: user.id,
    description: 'create',
    userId: opts.userId,
    createdAt: new Date()
  };
  return ActivityLog.create(activityLogSpec)
    .then(() => {
      return user;
    });
}


function createUser(userSpec, opts) {
  opts = opts || {};
  setUserHashedPassword(userSpec);
  return User.create(userSpec)
    .then(user => {
      return createActivityLog(user, opts);
    });
}


module.exports = createUser;
