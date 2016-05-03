'use strict';

const editableProperties = [
  'abstract',
  'title'
];


function isPropertyChanged(x, y, property) {
  return x[property] !== y[property];
}


function isEdit(originalDocument, modifiedDocument) {
  for (let i = 0; i < editableProperties.length; i++) {
    if (isPropertyChanged(originalDocument, modifiedDocument, editableProperties[i])) {
      return true;
    }
  }
  return false;
}


function isPublish(originalDocument, modifiedDocument) {
  return modifiedDocument.published && !originalDocument.published;
}


function isUnpublish(originalDocument, modifiedDocument) {
  return !modifiedDocument.published && originalDocument.published;
}


function getDocumentActions(originalDocument, modifiedDocument) {
  let actions = [];
  if (isEdit(originalDocument, modifiedDocument)) {
    actions.push({ action: 'edit document' });
  }
  if (isPublish(originalDocument, modifiedDocument)) {
    actions.push({ action: 'publish document' });
  }
  if (isUnpublish(originalDocument, modifiedDocument)) {
    actions.push({ action: 'unpublish document' });
  }
  return actions;
}

module.exports = getDocumentActions;
