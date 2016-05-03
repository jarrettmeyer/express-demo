'use strict';

// Properties that can be edited.
const editProperties = ['abstract', 'title'];


function hasProperty(document, property) {
  return !!document[property];
}

function isPropertyChanged(x, y, property) {
  return x[property] !== y[property];
}

/**
 * isDocumentEdit
 *
 * Returns true if the document is an edit action. Otherwise returns false.
 */
function isDocumentEdit(originalDocument, updatedDocument) {
  return editProperties.reduce((prev, curr) => {
    if (prev) {
      return prev;
    }
    if (hasProperty(updatedDocument, curr)) {
      if (isPropertyChanged(originalDocument, updatedDocument, curr)) {
        return true;
      }
    }
    return false;
  }, false);
}
module.exports = isDocumentEdit;
