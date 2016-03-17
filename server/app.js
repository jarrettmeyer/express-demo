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
app.use(logRequests);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(request, response, next) {
  var err = new Error(`The requested page ${request.path} could not be found.`);
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  var reply = _.cloneDeep(err);
  delete reply.stacktrace;
  res.status(err.status || 500).json({ error: reply });
});


module.exports = app;
