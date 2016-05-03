'use strict';
const Document = require('../../models/Document');
const toDocumentJson = require('./helpers/toDocumentJson');

/**
 * getAll
 *
 * Get all documents will return all documents visible by the current user. It
 * will return all documents where the current user is the owner, and all published
 * documents for all users.
 */
module.exports = (request, response) => {
  let documentCriteria = {
    where: {
      $and: [
        {
          $or: [
            { ownerId: request.user.id },
            { published: true }
          ]
        },
        { removed: false }
      ]
    }
  };
  return Document.findAll(documentCriteria)
    .then(documents => {
      return response.status(200)
        .json({ documents: documents.map(toDocumentJson) });
    });
};
