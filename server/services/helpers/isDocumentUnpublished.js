'use strict';

function isDocumentUnpublished(originalDocument, updatedDocument) {
  return originalDocument.published && !updatedDocument.published;
}

module.exports = isDocumentUnpublished;
