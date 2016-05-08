'use strict';
const ActivityLog = require('../../models/ActivityLog');
const Document = require('../../models/Document');
const errors = require('../../errors');

const HttpNotFound = errors.HttpNotFound;

function createActivityLog(request, description) {
  return () => {
    let activityLogSpec = {
      refType: 'document',
      refId: request.params.id,
      description: description,
      userId: request.user.id,
      createdAt: new Date()
    };
    return ActivityLog.create(activityLogSpec);
  };
}

function send204(response) {
  // A delete operation does not need to send anything back to the client.
  // 204 No Content will suffice.
  return () => {
    return response.status(204).send();
  };
}


module.exports = (request, response) => {
  if (request.document.removed) {
    throw new HttpNotFound();
  }
  let spec = { published: false, removed: true };
  let criteria = { where: { id: request.params.id } };
  return Document.update(spec, criteria)
    .then(createActivityLog(request, 'unpublish'))
    .then(createActivityLog(request, 'remove'))
    .then(send204(response));
};
