'use strict';
const Document = require('../../models/Document');
const toDocumentJson = require('./toDocumentJson');
const updateDocumentFile = require('../../services/updateDocumentFile');


function postFile(request, response) {
  return updateDocumentFile(request.params.id, request.user.id, request.file)
    .then(() => {
      return Document.findById(request.document.id);
    })
    .then(document => {
      return response.status(200).json({ document: toDocumentJson(document) });
    });
}


module.exports = postFile;
