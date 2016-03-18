'use strict';

class HttpError extends Error {
  constructor (status, message) {
    super(message);
    this.message = message;
    this.status = status;
    this.name = 'HttpError';
    this.errors = [];
  }

  addError(msg) {
    this.errors.push({ message: msg });
  }
}

module.exports = HttpError;
