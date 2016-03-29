'use strict';

const documents = require('../../services/documents');
const saveFile = require('../../services/files/saveFile');
const _ = require('lodash');

function getDocumentData(document, fileData, saveFileResult) {
  return _.assign(document, {
    originalFilename: fileData.originalname,
    type: fileData.mimetype,
    path: saveFileResult.path
  });
}

function postFile(request, response) {
  let responseDocument = null;
  return saveFile(request.file.buffer.data, request.user)
    .then(saveFileResult => {
      let documentData = getDocumentData(request.document, request.file, saveFileResult);
      return documents.update(documentData);
    })
    .then(updateDocumentResult => {
      responseDocument = updateDocumentResult;
      return response.status(200).json({ document: responseDocument.toJSON() });
    });
}

module.exports = postFile;
