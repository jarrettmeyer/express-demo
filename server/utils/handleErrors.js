'use strict';

const debug = require('debug')('api');

// jshint -W098
function handleErrors(error, request, response, next) {
  // jshint +W098
  let status = error.status || 500;
  let responseObject = {
    message: error.message,
    name: error.name,
    path: request.path
  };
  if (error.name === 'ValidationError') {
    status = 400;
    responseObject.message = 'The data submitted was not valid.';
    responseObject.errors = error.errors;
  }
  debug(`Error: ${error.name} (${status}) - ${error.message}`);
  if (error.errors && error.errors.length > 0) {
    debug(`      ${JSON.stringify(error.errors)}`);
  }
  return response.status(status).json(responseObject);
}

module.exports = handleErrors;
