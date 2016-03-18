'use strict';

const debug = require('debug')('server');
const documents = require('../../services').documents;
const ValidationError = require('../../errors').ValidationError;

module.exports = (request, response, next) => {
  let documentData = request.body.document;
  if (!documentData) {
    return response.status(400).json('bad request');
  }
  documentData.ownerId = request.user.id;
  debug(`Saving a new document for owner (${documentData.ownerId}).`);
  return documents.create(documentData)
    .then(document => {
      debug(`Successfully saved new document id (${document.id}).`);
      return response.status(201)
        .set('location', `/api/documents/${document.id}`)
        .json({ document: document.toJSON() });
    })
    .catch(ValidationError, next);
};
