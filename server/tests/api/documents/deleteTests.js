'use strict';
const ActivityLog = require('../../../models/ActivityLog');
const createDocument = require('../createDocument');
const Document = require('../../../models/Document');
const expect = require('chai').expect;
const getTokenForEmail = require('../getTokenForEmail');
const request = require('../setupRequest');
const testUnauthorizedRequest = require('../testUnauthorizedRequest');

describe('DELETE /api/documents/:id', () => {

  let documentId = null, title = null, token = null, url = null;


  function sendDelete(expectedStatus) {
    return request()
      .delete(url)
      .set('Authorization', token)
      .expect(expectedStatus);
  }


  beforeEach(() => {
    token = getTokenForEmail('alice@example.com');
    title = `Delete Test ${Date.now()}`;
    return createDocument({ title: title, published: true }, token)
      .then(document => {
        documentId = document.id;
        url = `/api/documents/${document.id}`;
      });
  });


  it('creates an activity log entry for remove', () => {
    return sendDelete(204)
      .then(() => {
        return ActivityLog.findOne({
          where: {
            $and: [
              { refType: 'document' },
              { refId: documentId },
              { description: 'remove' }
            ]
          }
        });
      })
      .then(log => {
        expect(log.id).to.be.greaterThan(0);
      });
  });


  it('creates an activity log entry for unpublish', () => {
    return sendDelete(204)
      .then(() => {
        return ActivityLog.findOne({
          where: {
            $and: [
              { refType: 'document' },
              { refId: documentId },
              { description: 'unpublish' }
            ]
          }
        });
      })
      .then(log => {
        expect(log.id).to.be.greaterThan(0);
      });
  });


  it('fails (401) when a token is not provided', () => {
    return testUnauthorizedRequest(request, 'delete', url);
  });


  it('fails (403) when user is not the owner', () => {
    token = getTokenForEmail('claire@example.com');
    return sendDelete(403);
  });


  it('fails (404) when the document has been previously removed', () => {
    return sendDelete(204)
      .then(() => {
        return sendDelete(404);
      });
  });


  it('fails (404) when the id is invalid', () => {
    url = '/api/documents/999999';
    return sendDelete(404);
  });


  it('sets published: false', () => {
    return sendDelete(204)
      .then(() => {
        return Document.findById(documentId);
      })
      .then(doc => {
        expect(doc.id).to.equal(documentId);
        expect(doc.published).to.equal(false);
      });
  });


  it('sets removed: true', () => {
    return sendDelete(204)
      .then(() => {
        return Document.findById(documentId);
      })
      .then(doc => {
        expect(doc.id).to.equal(documentId);
        expect(doc.removed).to.equal(true);
      });
  });


  it('succeeds for owners', () => {
    return sendDelete(204);
  });

});
