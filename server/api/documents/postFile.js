'use strict';

const debug = require('debug')('server');
const documents = require('../../services/documents');
const saveFile = require('../../services/files/saveFile');

module.exports = (request, response) => {
  var fileData = request.file;
  return saveFile(fileData.buffer.data, request.user)
    .then(saveFileResult => {
      let documentData = {
        id: request.document.id,
        title: request.document.title,
        abstract: request.document.abstract,
        originalFilename: fileData.originalname,
        path: saveFileResult.path,
        type: fileData.mimetype,
        published: request.document.published
      };
      return documents.update(documentData);
    })
    .then(updateDocumentResult => {
      return response.status(200).json({ document: updateDocumentResult.toJSON() });
    });
}
