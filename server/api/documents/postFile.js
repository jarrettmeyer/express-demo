'use strict';
const ActivityLog = require('../../models/ActivityLog');
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
      let activityLogSpec = {
        refType: 'document',
        refId: request.document.id,
        description: `save file: ${request.file.originalname}`,
        userId: request.user.id,
        createdAt: new Date()
      };
      return ActivityLog.create(activityLogSpec);
    })
    .then(() => {
      return Document.findById(request.document.id);
    })
    .then(document => {
      return response.status(200).json({ document: toDocumentJson(document) });
    });
}

module.exports = postFile;
