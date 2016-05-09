/* jshint expr: true */
'use strict';

const ActivityLog = require('../../../models/ActivityLog');
const Document = require('../../../models/Document');
const expect = require('chai').expect;
const getTokenForEmail = require('../getTokenForEmail');
const request = require('../setupRequest');
const testUnauthorizedRequest = require('../testUnauthorizedRequest');

const url = '/api/documents';

describe('POST /api/documents', () => {

  let postData, title, validToken;

  beforeEach(() => {
    title = `test document ${Date.now()}`;
    postData = {
      document: {
        title: title,
        abstract: `This is an API test. It was created at ${new Date()}`
      }
    };
    validToken = getTokenForEmail('alice@example.com');
  });

  it('can create a document with published: true', () => {
    postData.document.published = true;
    return request()
      .post(url)
      .set('Authorization', validToken)
      .send(postData)
      .then(response => {
        expect(response.body.document.id).to.be.greaterThan(0);
        expect(response.body.document.published).to.equal(true);
        return Document.findById(response.body.document.id);
      })
      .then(doc => {
        expect(doc.published).to.equal(true);
      });
  });

  it('cannot create a document with removed: true', () => {
    postData.document.removed = true;
    return request()
      .post(url)
      .set('Authorization', validToken)
      .send(postData)
      .expect(400);
  });


  it('inserts an activity log for "create"', () => {
    return request()
      .post(url)
      .set('Authorization', validToken)
      .send(postData)
      .then(response => {
        let id = response.body.document.id;
        return ActivityLog.findAllForDocument(id);
      })
      .then(logs => {
        let createLog = logs.filter(log => {
          return log.description === 'create';
        })[0];
        expect(createLog.id).to.be.greaterThan(0);
      });
  });


  it('inserts an activity log for "publish"', () => {
    postData.document.published = true;
    return request()
      .post(url)
      .set('Authorization', validToken)
      .send(postData)
      .then(response => {
        let id = response.body.document.id;
        return ActivityLog.findAllForDocument(id);
      })
      .then(logs => {
        let publishLog = logs.filter(log => {
          return log.description === 'publish';
        })[0];
        expect(publishLog.id).to.be.greaterThan(0);
      });
  });


  it('returns 201', () => {
    return request()
      .post(url)
      .set('Authorization', validToken)
      .send(postData)
      .expect(201)
      .then(response => {
        let location = response.headers.location;
        expect(location).to.match(/\/api\/documents\/\d+/);
      });
  });

  it('returns 400 when the document does not have a title', () => {
    postData.document.title = null;
    return request()
      .post(url)
      .set('Authorization', validToken)
      .send(postData)
      .expect(400)
      .then(response => {
        expect(response.body.message).to.equal('The data submitted was not valid.');
        expect(response.body.errors[0].message).to.equal('title cannot be null');
      });
  });

  it('returns 401 when user is not authenticated', () => {
    return testUnauthorizedRequest(request, 'post', url);
  });

  it('returns the document object', () => {
    return request()
      .post(url)
      .set('Authorization', validToken)
      .send(postData)
      .then(response => {
        expect(response.body.document).to.exist;
        expect(response.body.document.title).to.equal(title);
      });
  });

  it('sets the document ownerId', () => {
    return request()
      .post(url)
      .set('Authorization', validToken)
      .send(postData)
      .expect(201)
      .then(response => {
        expect(response.body.document.ownerId).toExist;
        expect(response.body.document.ownerId).to.be.greaterThan(0);
      });
  });

});
