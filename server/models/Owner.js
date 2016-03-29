'use strict';

class Owner {
  constructor(spec) {
    this.id = spec.id;
    this.displayName = spec.displayName || spec.display_name || spec.email;
    this.email = spec.email;
  }

  toString() {
    return `Owner ${this.id}, ${this.displayName} (${this.email})`;
  }
}

module.exports = Owner;
