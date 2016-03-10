'use strict';

const debug = require('debug')('server');
const documents = require('../services/documents');

module.exports = (request, response, next) => {
  let documentId = request.params.id;
  let userId = request.user.id;
  documents.findById(documentId)
    .then(document => {
      if (!document) {
        debug(`Document does not exist. id = ${documentId}`);
        return response.status(404).send('not found');
      }
      if (document.ownerId === userId) {
        request.document = document;
        return next();
      }
      return response.status(403).send('forbidden');
    });
}
