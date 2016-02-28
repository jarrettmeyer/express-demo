'use strict';

class Document {
  constructor(spec) {
    spec = spec || {};
    this.id = spec.id;
    this.ownerId = spec.ownerId || spec.owner_id;
    this.title = spec.title;
    this.abstract = spec.abstract;
    this.path = spec.path;
    this.type = spec.type;
    this.published = spec.published;
    this.removed = spec.removed;
  }
}

module.exports = Document;
