'use strict';
const ActivityLog = require('../models/ActivityLog');
const Document = require('../models/Document');
const saveFile = require('./saveFileToDisk');


function createActivityLog(documentId, userId) {
  let activityLogSpec = {
    refType: 'document',
    refId: documentId,
    description: 'upload file',
    userId: userId,
    createdAt: new Date()
  };
  return ActivityLog.create(activityLogSpec);
}


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


function updateDocumentFile(documentId, userId, file) {
  return saveFile(file.buffer.data, userId)
    .then(saveFileResult => {
      return updateDocument(documentId, file, saveFileResult.path);
    })
    .then(() => {
      return createActivityLog(documentId, userId);
    });
}

module.exports = updateDocumentFile;
