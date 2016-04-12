'use strict';

const debug = require('debug')('api');

function pageNotFound(request, response, next) {
  let error = new Error(`The requested page ${request.path} could not be found.`);
  error.status = 404;
  debug(`Error: Not found`);
  debug(`       ${error.message}`);
  next(error);
}

module.exports = pageNotFound;
