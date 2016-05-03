'use strict';
const createDocument = require('../../services/createDocument');
const debug = require('debug')('server');

module.exports = (request, response, next) => {
  let documentData = request.body.document;
  if (!documentData) {
    return response.status(400).json('bad request');
  }
  documentData.ownerId = request.user.id;
  debug(`Saving a new document for owner (${documentData.ownerId}).`);
  return createDocument(documentData, { userId: request.user.id })
    .then(document => {
      debug(`Successfully saved new document id (${document.id}).`);
      return response.status(201)
        .set('location', `/api/documents/${document.id}`)
        .json({ document: document.toJSON() });
    })
    .catch(next);
};
