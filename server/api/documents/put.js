'use strict';

const debug = require('debug')('server');
const documents = require('../../services/documents');
const _ = require('lodash');

module.exports = (request, response) => {
  let updatedProperties = getBodyDocument(request);
  let originalDocument = request.document;
  let doc = _.assign(request.document, updatedProperties);
  return documents.update(doc)
    .then(doc => {
      return response.status(200).json({ document: doc });
    });
};

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
