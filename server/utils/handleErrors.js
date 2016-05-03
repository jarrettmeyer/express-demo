'use strict';

const debug = require('debug')('api');

// jshint -W098
function handleErrors(error, request, response, next) {
  // jshint +W098
  let responseObject = {
    message: error.message,
    name: error.name,
    path: request.path,
    status: error.status || 500
  };
  if (error.name === 'SequelizeValidationError') {
    responseObject.status = 400;
    responseObject.message = 'The data submitted was not valid.';
    responseObject.errors = error.errors.map(e => {
      return {
        message: e.message,
        property: e.path,
        value: e.value
      };
    });
  }
  debug(`Error: ${responseObject.name} (${responseObject.status}) - ${responseObject.message}`);
  if (responseObject.errors && responseObject.errors.length > 0) {
    debug(`      ${JSON.stringify(responseObject.errors)}`);
  }
  return response.status(responseObject.status).json(responseObject);
}

module.exports = handleErrors;
