'use strict';

var debug = require('debug')('api');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const logRequests = require('./utils/logRequests');
var routes = require('./routes');
var _ = require('lodash');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logRequests());
app.use('/', routes);

// catch 404 and forward to error handler
app.use((request, response, next) => {
  var error = new Error(`The requested page ${request.path} could not be found.`);
  error.status = 404;
  debug(`Error: Not found`);
  debug(`       ${error.message}`);
  next(error);
});

app.use((error, request, response, next) => {
  let status = error.status || 500;
  debug(`Error: ${error.name} (${status}) - ${error.message}`);
  if (error.errors && error.errors.length) {
    debug(`       ${error.errors}`);
  }
  return response.status(status).json({
    error: error,
    path: request.path
  });
});


module.exports = app;
