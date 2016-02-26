"use strict";

class User {
  constructor(spec) {
    spec = spec || {};
    this.id = spec.id;
    this.email = spec.email;
    this.hashedPassword = spec.hashedPassword || spec.hashed_password;
    this.admin = spec.admin;
    this.removed = spec.removed;
  }
}

module.exports = User;
