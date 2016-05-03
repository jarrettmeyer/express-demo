'use strict';
const Document = require('../../models/Document');
const saveFile = require('../../services/saveFile');
const toDocumentJson = require('./helpers/toDocumentJson');

function updateDocument(id, file, path) {
  let updateSpec = {
    originalFilename: file.originalname,
    path: path,
    type: file.mimetype
  };
  let updateCriteria = {
    where: { id: id }
  };
  return Document.update(updateSpec, updateCriteria);
}

function postFile(request, response) {
  return saveFile(request.file.buffer.data, request.user)
    .then(saveFileResult => {
      return updateDocument(request.document.id, request.file, saveFileResult.path);
    })
    .then(() => {
      return Document.findById(request.document.id);
    })
    .then(document => {
      return response.status(200).json({ document: toDocumentJson(document) });
    });
}

module.exports = postFile;
