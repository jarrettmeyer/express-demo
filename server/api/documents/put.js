'use strict';
const Document = require('../../models/Document');

function put(request, response) {
  // Depending on the client, the id property may not be set on the body document.
  // The client may simply rely on the request URL. If that's the case, then be
  // sure to set the body document id property.
  let document = request.body.document;
  document.id = request.params.id;
  return Document.update({
    title: request.body.document.title,
    abstract: request.body.document.abstract
  }, {
    where: { id: request.params.id }
  })
    .then(doc => {
      return response.status(200).json({ document: doc.toJSON() });
    });
}


module.exports = put;
