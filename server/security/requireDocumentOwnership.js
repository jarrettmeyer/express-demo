'use strict';

const debug = require('debug')('server');
const Document = require('../models/Document');
const errors = require('../errors');

const HttpForbidden = errors.HttpForbidden;
const HttpNotFound = errors.HttpNotFound;

module.exports = (request, response, next) => {
  let documentId = request.params.id;
  let userId = request.user.id;
  Document.findById(documentId)
    .then(document => {
      if (!document) {
        debug(`Document does not exist. id = ${documentId}`);
        let notFound = new HttpNotFound();
        notFound.addError(`Document ${documentId} could not be found.`);
        return next(notFound);
      }
      if (document.ownerId === userId) {
        request.document = document;
        return next();
      }
      let forbidden = new HttpForbidden();
      forbidden.addError(`Access to document ${documentId} is forbidden.`);
      return next(forbidden);
    });
};
