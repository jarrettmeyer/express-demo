'use strict';

const HttpError = require('./HttpError');

class HttpForbidden extends HttpError {
  constructor() {
    super(403, 'Forbidden');
    this.name = 'HttpForbidden';
  }
}

module.exports = HttpForbidden;
