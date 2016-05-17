'use strict';
const HttpForbidden = require('../errors').HttpForbidden;

module.exports = (request, response, next) => {
  if (request.user.admin) {
    return next();
  }
  return next(new HttpForbidden());
};
