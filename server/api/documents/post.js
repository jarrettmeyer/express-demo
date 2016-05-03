'use strict';

const debug = require('debug')('server');
const Document = require('../../models/Document');

module.exports = (request, response, next) => {
  let documentData = request.body.document;
  if (!documentData) {
    return response.status(400).json('bad request');
  }
  documentData.ownerId = request.user.id;
  debug(`Saving a new document for owner (${documentData.ownerId}).`);
  return Document.create(documentData)
    .then(document => {
      debug(`Successfully saved new document id (${document.id}).`);
      return response.status(201)
        .set('location', `/api/documents/${document.id}`)
        .json({ document: document.toJSON() });
    })
    .catch(next);
};
