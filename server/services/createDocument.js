'use strict';
const ActivityLog = require('../models/ActivityLog');
const Document = require('../models/Document');


function createActivityLog(document, opts) {
  let activityLogSpec = {
    refType: 'document',
    refId: document.id,
    description: 'create',
    userId: opts.userId,
    createdAt: new Date()
  };
  return ActivityLog.create(activityLogSpec)
    .then(function () {
      return document;
    });
}


function createDocument(documentSpec, opts) {
  opts = opts || {};
  return Document.create(documentSpec)
    .then(document => {
      return createActivityLog(document, opts);
    });
}


module.exports = createDocument;
