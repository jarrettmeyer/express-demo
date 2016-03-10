'use strict';

const HttpError = require('./HttpError');

class HttpNotFound extends HttpError {
  constructor() {
    super(404, 'Not found');
    this.name = 'HttpNotFound';
  }
}

module.exports = HttpNotFound;
