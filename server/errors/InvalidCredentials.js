"use strict";

const message = 'Invalid credentials';

class InvalidCredentials extends Error {
  constructor () {
    super(message);
    this.message = message;
    this.name = 'InvalidCredentials';
  }
}

module.exports = InvalidCredentials;
