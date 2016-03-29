'use strict';

const documents = require('../../services/documents');
const _ = require('lodash');

const updatableProperties = ['abstract', 'title'];


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


function isPropertyChanged(doc, updatedProperties, property) {
  return updatedProperties[property] && doc[property] !== updatedProperties[property];
}


function isEdit(doc, updatedProperties) {
  for (let i = 0; i < updatableProperties.length; i++) {
    if (isPropertyChanged(doc, updatedProperties, updatedProperties[i])) {
      return true;
    }
  }
  return false;
}


function isPublish(doc, updatedProperties) {
  return updatedProperties.published === true && !doc.published;
}


function isUnpublish(doc, updatedProperties) {
  return updatedProperties.published === false && doc.published;
}


function getActions(doc, updatedProperties) {
  let actions = [];
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


function put(request, response) {
  let updatedProperties = getBodyDocument(request);
  let doc = _.assign(request.document, updatedProperties);
  let actions = getActions(request.document, updatedProperties);
  return documents.update(doc, actions)
    .then(doc => {
      return response.status(200).json({ document: doc.toJSON() });
    });
}


module.exports = put;
