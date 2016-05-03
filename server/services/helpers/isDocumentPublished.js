'use strict';

function isDocumentPublished(originalDocument, updatedDocument) {
  return !originalDocument.published && updatedDocument.published;
}

module.exports = isDocumentPublished;
