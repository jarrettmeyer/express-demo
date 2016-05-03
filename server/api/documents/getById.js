'use strict';

const debug = require('debug')('server');
const Document = require('../../models/Document');
const errors = require('../../errors');

const HttpForbidden = errors.HttpForbidden;
const HttpNotFound = errors.HttpNotFound;

function documentIsOwnedByCurrentUser(document, user) {
  return document.ownerId === user.id;
}

function documentIsPublished(document) {
  return document.published === true;
}

function documentIsRemoved(document) {
  return document.removed === true;
}

function getById(request, response, next) {
  let documentId = request.params.id;
  debug(`Get document by id: ${documentId}`);
  return Document.findById(documentId)
    .then(document => {
      if (documentIsRemoved(document)) {
        return next(new HttpNotFound());
      }
      if (documentIsPublished(document)) {
        return response.status(200).json({ document: document.toJSON() });
      }
      if (documentIsOwnedByCurrentUser(document, request.user)) {
        return response.status(200).json({ document: document.toJSON() });
      }
      return next(new HttpForbidden());
    });
}

module.exports = getById;
