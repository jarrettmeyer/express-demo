'use strict';

const HttpError = require('./HttpError');

class HttpNotFound extends HttpError {
  constructor(msg) {
    super(404, 'Not found');
    this.name = 'HttpNotFound';
    if (msg) {
      this.errors = [{ message: msg }];
    }
  }
}

module.exports = HttpNotFound;
