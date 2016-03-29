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
    this.createdAt = spec.createdAt || spec.created_at;
  }

  toJSON() {
    return {
      id: this.id,
      displayName: this.displayName,
      email: this.email,
      admin: this.admin,
      removed: this.removed,
      tokenIssuedAt: this.tokenIssuedAt,
      createdAt: this.createdAt
    };
  }
}

module.exports = User;
