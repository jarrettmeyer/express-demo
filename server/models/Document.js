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
    this.originalFilename = spec.originalFilename || spec.original_filename;
    this.type = spec.type;
    this.path = spec.path;
    this.published = spec.published;
    this.removed = spec.removed;
  }

  toJSON() {
    return {
      id: this.id,
      ownerId: this.ownerId,
      title: this.title,
      abstract: this.abstract,
      type: this.type,
      published: this.published
    };
  }
}

module.exports = Document;
