'use strict';
const ActivityLog = require('../models/ActivityLog');
const Document = require('../models/Document');


function createActivityLog(description, opts) {
  return (document) => {
    // Only create a publish log if the document is really published.
    if (description === 'publish' && !document.published) {
      return document;
    }
    let spec = {
      refType: 'document',
      refId: document.id,
      description: description,
      userId: opts.userId,
      createdAt: opts.createdAt || new Date()
    };
    return ActivityLog.create(spec)
      .then(() => {
        return document;
      });
  };
}


function createDocument(documentSpec, opts) {
  opts = opts || {};
  return Document.create(documentSpec)
    .then(createActivityLog('create', opts))
    .then(createActivityLog('publish', opts));
}


module.exports = createDocument;
