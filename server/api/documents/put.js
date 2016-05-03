'use strict';
const Document = require('../../models/Document');
const toDocumentJson = require('./helpers/toDocumentJson');

function put(request, response) {
  // Depending on the client, the id property may not be set on the body document.
  // The client may simply rely on the request URL. If that's the case, then be
  // sure to set the body document id property.
  let document = request.body.document;
  document.id = request.params.id;
  let spec = {
    title: request.body.document.title,
    abstract: request.body.document.abstract
  };
  let criteria = {
    where: { id: request.params.id }
  };
  return Document.update(spec, criteria)
    .then(() => {
      return Document.findById(request.params.id);
    })
    .then(document => {
      return response.status(200).json({ document: toDocumentJson(document) });
    });
}


module.exports = put;
