'use strict';
const Document = require('../../models/Document');
const saveFile = require('../../services/saveFile');

function updateDocument(id, file, path) {
  return Document.update({
    originalFilename: file.originalname,
    path: path,
    type: file.mimetype
  }, {
    where: { id: id }
  });
}

function postFile(request, response) {
  let responseDocument = null;
  return saveFile(request.file.buffer.data, request.user)
    .then(saveFileResult => {
      return updateDocument(request.document.id, request.file, saveFileResult.path);
    })
    .then(updateDocumentResult => {
      responseDocument = updateDocumentResult;
      return response.status(200).json({ document: responseDocument.toJSON() });
    });
}

module.exports = postFile;
