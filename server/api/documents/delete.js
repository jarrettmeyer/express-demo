'use strict';
const ActivityLog = require('../../models/ActivityLog');
const Document = require('../../models/Document');
const errors = require('../../errors');

const HttpNotFound = errors.HttpNotFound;

module.exports = (request, response) => {
  if (request.document.removed) {
    throw new HttpNotFound();
  }
  let spec = { removed: true };
  let criteria = { where: { id: request.params.id } };
  return Document.update(spec, criteria)
    .then(() => {
      let activityLogSpec = {
        refType: 'document',
        refId: request.params.id,
        description: 'remove',
        userId: request.user.id,
        createdAt: new Date()
      };
      return ActivityLog.create(activityLogSpec);
    })
    .then(() => {
      return response.status(204).send();
    });
};
