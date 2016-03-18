'use strict';

const debug = require('debug')('server');
const documents = require('../../services/documents');
const _ = require('lodash');

module.exports = (request, response) => {
  let updatedProperties = getBodyDocument(request);
  let doc = _.assign(request.document, updatedProperties);
  return documents.update(doc)
    .then(doc => {
      return response.status(200).json({ document: doc.toJSON() });
    });
};

function getActions(doc, updatedProperties) {
  var actions = [];
  if (isPublish(doc, updatedProperties)) {
    actions.push('publish');
  }
  if (isUnpublish(doc, updatedProperties)) {
    actions.push('unpublish');
  }
  if (isEdit(doc, updatedProperties)) {
    actions.push('edit');
  }
  return actions;
}

function getBodyDocument(request) {
  // The following properties are allowed to be modified by a PUT request. Any
  // other properties modified by the request should be ignored.
  let whitelist = ['title', 'abstract', 'published'];
  let doc = {};
  whitelist.forEach(kw => {
    if (request.body.document.hasOwnProperty(kw)) {
      doc[kw] = request.body.document[kw];
    }
  });
  return doc;
}

function isEdit(doc, updatedProperties) {
  return isPropertyChanged(doc, updatedProperties, 'abstract') ||
    isPropertyChanged(doc, updatedProperties, 'title');
}

function isPropertyChanged(doc, updatedProperties, property) {
  return updatedProperties[property] && doc[property] !== updatedProperties[property];
}

function isPublish(doc, updatedProperties) {
  return updatedProperties.published === true && !doc.published;
}

function isUnpublish(doc, updatedProperties) {
  return updatedProperties.published === false && doc.published;
}
