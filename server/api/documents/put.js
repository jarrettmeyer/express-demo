'use strict';
const ActivityLog = require('../../models/ActivityLog');
const Document = require('../../models/Document');
const getDocumentUpdateActions = require('../../services/helpers/getDocumentUpdateActions');
const Promise = require('bluebird');
const toDocumentJson = require('./toDocumentJson');


function createActivityLogs(request, document) {
  let actions = getDocumentUpdateActions(request.document, document);
  let promise = action => {
    let activityLogSpec = {
      refType: 'document',
      refId: request.params.id,
      description: action,
      userId: request.user.id,
      createdAt: new Date()
    };
    return ActivityLog.create(activityLogSpec);
  };
  return Promise.map(actions, promise)
    .then(() => {
      return document;
    });

}


function put(request, response) {
  // Set the new published flag. If the published flag is explicitly set, use the value.
  // Otherwise, use the original value.
  let published = request.document.published;
  if (request.body.document.published === false || request.body.document.published === true) {
    published = request.body.document.published;
  }
  let spec = {
    title: request.body.document.title || request.document.title,
    abstract: request.body.document.abstract || request.document.abstract,
    published: published
  };
  let criteria = {
    where: { id: request.params.id }
  };
  return Document.update(spec, criteria)
    .then(() => {
      return Document.findById(request.params.id);
    })
    .then(document => {
      return createActivityLogs(request, document);
    })
    .then(document => {
      return response.status(200).json({ document: toDocumentJson(document) });
    });
}


module.exports = put;
