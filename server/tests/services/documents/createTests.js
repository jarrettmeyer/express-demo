'use strict';

const create = require('../../../services/documents').create;
const Document = require('../../../models').Document;
const executeQuery = require('../../../data').executeQuery;
const expect = require('chai').expect;

describe('documents/create()', () => {

  let abstract = `This is a test document. It was created by a unit test at ${new Date()}.`;
  let docData = null;
  let title = null;

  beforeEach(() => {
    title = 'test document ' + Date.now().toString();
    docData = {
      ownerId: 1,
      title: title,
      abstract: abstract
    };
  });

  it('inserts a new activity log row', () => {
    return create(docData)
      .then(doc => {
        let sql = `SELECT * FROM activity_logs WHERE ref_type = 'document' AND ref_id = ${doc.id} AND description = 'create document';`;
        return executeQuery(sql);
      })
      .then(result => {
        expect(result.rows.length).to.equal(1);
        let row = result.rows[0];
        expect(row.id).to.be.greaterThan(0);
      });
  });

  it('inserts a new document row', () => {
    return create(docData)
      .then((doc) => {
        expect(doc.id).to.be.greaterThan(0);
      });
  });

  it('returns a document instance', () => {
    return create(docData)
      .then(doc => {
        expect(doc).to.be.instanceOf(Document);
      });
  });

  it('sets published: false', () => {
    return create(docData)
      .then(doc => {
        expect(doc.published).to.equal(false);
      });
  });

  it('sets removed: false', () => {
    return create(docData)
      .then(doc => {
        expect(doc.removed).to.equal(false);
      });
  });

});
