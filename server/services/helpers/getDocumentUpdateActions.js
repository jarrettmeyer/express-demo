'use strict';
const isDocumentEdit = require('./isDocumentEdit');
const isDocumentPublished = require('./isDocumentPublished');
const isDocumentUnpublished = require('./isDocumentUnpublished');

function getDocumentUpdateActions(originalDocument, updatedDocument) {
  let actions = [];
  if (isDocumentEdit(originalDocument, updatedDocument)) {
    actions.push('update');
  }
  if (isDocumentPublished(originalDocument, updatedDocument)) {
    actions.push('publish');
  }
  if (isDocumentUnpublished(originalDocument, updatedDocument)) {
    actions.push('unpublish');
  }
  return actions;
}

module.exports = getDocumentUpdateActions;
