'use strict';

function isDocumentRemoved(originalDocument, updatedDocument) {
  return !originalDocument.removed && updatedDocument.removed;
}

module.exports = isDocumentRemoved;
