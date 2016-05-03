'use strict';

const Document = require('../../../models/Document');
const expect = require('chai').expect;
const getTokenForEmail = require('../getTokenForEmail');
const request = require('../setupRequest');

describe('GET /api/documents/:id/file', () => {

  let docId, docs;

  beforeEach(() => {
    return Document.findAll({ where: { title: 'Fixture document #4' } })
      .then(_docs => {
        docId = _docs[0].id;
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
