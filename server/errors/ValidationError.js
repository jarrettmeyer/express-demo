'use strict';

class ValidationError extends Error {
  constructor(message) {
    super(message || 'There were validation errors.');
    this.name = 'ValidationError';
  }
}

module.exports = ValidationError;
