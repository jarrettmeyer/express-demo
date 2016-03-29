'use strict';

const documents = require('../../../services/documents');
const expect = require('chai').expect;
const getTokenForEmail = require('../getTokenForEmail');
const request = require('../setupRequest');

describe('GET /api/documents/:id/file', () => {

  let docId, docs;

  beforeEach(() => {
    return documents.findAll({ ownerId: -1 })
      .then(_docs => {
        docs = _docs;
        docId = _docs.filter(doc => {
          return doc.title === 'Fixture document #4';
        })[0].id;
      });
  });

  it('can download a document', () => {
    return request()
      .get(`/api/documents/${docId}/file`)
      .set('Authorization', getTokenForEmail('claire@example.com'))
      .expect(200)
      .then(response => {
        expect(response.headers['content-disposition']).to.equal('attachment; filename=sample.txt');
        expect(response.headers['content-type']).to.equal('text/plain');
      });
  });

});
