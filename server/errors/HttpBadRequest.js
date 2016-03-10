'use strict';

const HttpError = require('./HttpError');

class HttpBadRequest extends HttpError {
  constructor() {
    super(400, 'Bad request');
    this.name = 'HttpBadRequest';
  }
}

module.exports = HttpBadRequest;
