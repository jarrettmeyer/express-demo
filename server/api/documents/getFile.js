'use strict';
const Document = require('../../models/Document');
const errors = require('../../errors');

const HttpForbidden = errors.HttpForbidden;
const HttpNotFound = errors.HttpNotFound;

function documentBelongsToCurrentUser(doc, user) {
  return doc.ownerId === user.id;
}

function documentDoesNotExist(doc) {
  return !doc || doc.removed;
}

function documentIsPublished(doc) {
  return doc.published;
}

function getFile(request, response) {
  let documentId = request.params.id;
  return Document.findById(documentId)
    .then(doc => {
      if (documentDoesNotExist(doc)) {
        throw new HttpNotFound();
      }
      if (documentIsPublished(doc)) {
        return doc;
      }
      if (documentBelongsToCurrentUser(doc, request.user)) {
        return doc;
      }
      throw new HttpForbidden();
    })
    .then(doc => {
      if (doc.path) {
        let opts = {
          root: process.cwd(),
          headers: {
            'Content-Disposition': `attachment; filename=${doc.originalFilename}`,
            'Content-Type': doc.type
          }
        };
        return response.sendFile(doc.path, opts);
      }
      throw new HttpNotFound();
    });
}

module.exports = getFile;
