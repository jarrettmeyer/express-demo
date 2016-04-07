'use strict';

const documents = require('../../services/documents');

function put(request, response) {
  let updateParams = {
    id: request.params.id,
    originalDocument: request.document,
    user: request.user
  };
  // Depending on the client, the id property may not be set on the body document.
  // The client may simply rely on the request URL. If that's the case, then be
  // sure to set the body document id property.
  let document = request.body.document;
  document.id = request.params.id;
  return documents.update(document, updateParams)
    .then(doc => {
      return response.status(200).json({ document: doc.toJSON() });
    });
}


module.exports = put;
