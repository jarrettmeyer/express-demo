'use strict';

const documents = require('../../services').documents;


module.exports = (request, response) => {
  let documentData = request.body.document;
  if (!documentData) {
    return response.status(400);
  }
  documentData.ownerId = request.user.id;
  return documents.create(documentData)
    .then(document => {
      return response.status(201)
        .set('location', `/api/documents/${document.id}`)
        .json({ document: document });
    });
};
