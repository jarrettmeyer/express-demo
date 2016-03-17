'use strict';

const debug = require('debug')('api');
const _ = require('lodash');

const blacklist = ['password'];

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
  if (body && Object.keys(body).length) {
    blacklist.forEach(kw => {
      delete body[kw];
    });
    debug(`  >> ${JSON.stringify(body)}`);
  }
}
