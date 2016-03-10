'use strict';

var debug = require('debug')('server');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./routes');
var _ = require('lodash');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((request, response, next) => {
  debug(`${request.method} ${request.path}`);
  let body = _.cloneDeep(request.body);
  if (body && Object.keys(body).length) {
    //delete body.password;
    debug(`>> ${JSON.stringify(body)}`);
  }
  next();
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message
  });
});


module.exports = app;
