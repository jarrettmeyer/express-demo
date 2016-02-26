'use strict';

class User {
  constructor(spec) {
    spec = spec || {};
    this.id = spec.id;
    this.displayName = spec.displayName || spec.display_name;
    this.email = spec.email;
    this.hashedPassword = spec.hashedPassword || spec.hashed_password;
    this.admin = spec.admin;
    this.removed = spec.removed;
    this.tokenIssuedAt = spec.tokenIssuedAt || spec.token_issued_at;
  }
}

module.exports = User;
