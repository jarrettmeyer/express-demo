/* jshint expr: true */
'use strict';

const expect = require('chai').expect;
const getTokenForEmail = require('../getTokenForEmail');
const request = require('../setupRequest');
const _ = require('lodash');

describe('GET /api/documents/:id', () => {

  let document, email, token, url;

  function createDocument(opts) {
    opts = opts || {};
    let defaults = {
      title: `Get document test ${Date.now()}`,
      abstract: `This is a sample document. It was created to test /api/documents/:id`,
      published: true,
      removed: false
    };
    let postBody = {
      document: _.defaults(opts, defaults)
    };
    return request()
      .post('/api/documents')
      .set('Authorization', token)
      .send(postBody)
      .expect(201)
      .then(response => {
        document = response.body.document;
        url = `/api/documents/${document.id}`;
        expect(document.id).to.be.greaterThan(0);
        return document;
      });
  }

  beforeEach(() => {
    email = 'alice@example.com';
    token = getTokenForEmail(email);
    return createDocument();
  });

  it('does not return a removed document', () => {
    return createDocument({ removed: true })
      .then(doc => {
        return request()
          .get(`/api/documents/${doc.id}`)
          .set('Authorization', token)
          .expect(404);
      });
  });

  it('returns 200', () => {
    return request()
      .get(url)
      .set('Authorization', token)
      .expect(200)
      .then(response => {
        let doc = response.body.document;
        expect(doc).to.exist;
        expect(doc.id).to.be.greaterThan(0);
      });
  });

  it('returns 401 if the user has no token', () => {
    return request()
      .get(url)
      .expect(401);
  });

  it('returns 403 if the document is unpublished and does not belong to the current user', () => {
    return createDocument({ published: false })
      .then(document => {
        return request()
          .get(`/api/documents/${document.id}`)
          .set('Authorization', getTokenForEmail('claire@example.com'))
          .expect(403);
      });
  });

  it('returns a published document for another user', () => {
    return createDocument({ published: true })
      .then(document => {
        return request()
          .get(`/api/documents/${document.id}`)
          .set('Authorization', getTokenForEmail('claire@example.com'))
          .expect(200);
      });
  });

  it('returns an unpublished document for the current user', () => {
    return createDocument({ published: false })
      .then(document => {
        return request()
          .get(`/api/documents/${document.id}`)
          .set('Authorization', token)
          .expect(200);
      });
  });


});
