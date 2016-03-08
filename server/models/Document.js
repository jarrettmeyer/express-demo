'use strict';

/**
 * class Document
 *
 * Note: the `path` property has been removed from the object.
 */
class Document {
  constructor(spec) {
    spec = spec || {};
    this.id = spec.id;
    this.ownerId = spec.ownerId || spec.owner_id;
    this.title = spec.title;
    this.abstract = spec.abstract;
    this.type = spec.type;
    this.published = spec.published;
    this.removed = spec.removed;
  }
}

module.exports = Document;
