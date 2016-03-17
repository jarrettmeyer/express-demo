'use strict';

class HttpError extends Error {
  constructor (status, message) {
    super(message);
    this.message = message;
    this.status = status;
    this.name = 'HttpError';
    this.errors = [];
  }

  addError(err) {
    this.errors.push(err);
  }
}

module.exports = HttpError;
