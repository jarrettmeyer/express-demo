'use strict';
const request = require('./setupRequest');
const url = '/api/documents';

function createDocument(spec, token) {
  return request()
    .post(url)
    .set('Authorization', token)
    .send({ document: spec })
    .expect(201)
    .then(response => {
      return response.body.document;
    });
}

module.exports = createDocument;
