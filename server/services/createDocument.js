'use strict';
const Document = require('../models/Document');

function createDocument(documentSpec) {
  return Document.create(documentSpec);
}


module.exports = createDocument;
