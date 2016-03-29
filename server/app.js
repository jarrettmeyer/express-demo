'use strict';

const bodyParser = require('body-parser');
const debug = require('debug')('api');
const express = require('express');
const logRequests = require('./utils/logRequests');
const routes = require('./routes');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logRequests());
app.use('/', routes);

// catch 404 and forward to error handler
app.use((request, response, next) => {
  let error = new Error(`The requested page ${request.path} could not be found.`);
  error.status = 404;
  debug(`Error: Not found`);
  debug(`       ${error.message}`);
  next(error);
});

/* jshint -W098 */
// Error handlers are required to have 4 arguments. The `next` argument is not
// used, but is required by the Express middleware.
app.use((error, request, response, next) => {
  /* jshint +W098 */
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
});


module.exports = app;
