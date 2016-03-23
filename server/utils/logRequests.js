'use strict';

const debug = require('debug')('api');
const removeProperty = require('./removeProperty');
const _ = require('lodash');

const blacklist = ['password', 'passwordConfirmation'];

module.exports = () => {
  return function (request, response, next) {
    debug(`${request.method.toUpperCase()} ${request.path}`);
    logRequestBody(request);
    next();
  };
};


// Log the request body. Do not log any body properties that appear in the blacklist.
function logRequestBody(request) {
  let body = _.cloneDeep(request.body);
  removeProperty(body, blacklist);
  if (body && Object.keys(body).length) {
    debug(`  >> Request Body: ${JSON.stringify(body)}`);
  }
}
