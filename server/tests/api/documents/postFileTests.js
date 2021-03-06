/* jshint expr: true */
'use strict';

const assert = require('chai').assert;
const debug = require('debug')('test');
const Document = require('../../../models/Document');
const expect = require('chai').expect;
const fs = require('fs');
const getTokenForEmail = require('../getTokenForEmail');
const request = require('../setupRequest');
const testUnauthorizedRequest = require('../testUnauthorizedRequest');

describe('POST /api/documents/:id/file', () => {

  let document, email, token, url;

  function createDocument() {
    let postData = {
      document: {
        title: `test document ${Date.now()}`,
        abstract: `This is a test for attaching a file to a document.`
      }
    };
    return request()
      .post('/api/documents')
      .set('Authorization', token)
      .send(postData)
      .expect(201)
      .then(response => {
        debug(`response: ${response}`);
        document = response.body.document;
        url = `/api/documents/${document.id}/file`;
        debug(`Using URL: ${url}`);
      })
      .catch(error => {
        assert.fail(error);
      });
  }

  beforeEach(() => {
    email = 'alice@example.com';
    token = getTokenForEmail(email);
    debug(`Token = ${token}`);
    return createDocument();
  });

  it('fails (401) if the user is not logged in', () => {
    return testUnauthorizedRequest(request, 'post', url);
  });

  it('fails (403) if the document owner is not the current user', () => {
    let altToken = getTokenForEmail('claire@example.com');
    return request()
      .post(url)
      .set('Authorization', altToken)
      .expect(403);
  });

  it('fails (404) if the document id is not valid', function () {
    return request()
      .post('/api/documents/999999999/file')
      .set('Authorization', token)
      .attach('attachment', 'userdata/documents/sample.txt')
      .expect(404);
  });

  it('returns a 200 status (sample.txt)', () => {
    return request()
      .post(url)
      .set('Authorization', token)
      .attach('attachment', 'userdata/documents/sample.txt')
      .expect(200);
  });

  it('returns a document object (sample.pdf)', () => {
    return request()
      .post(url)
      .set('Authorization', token)
      .attach('attachment', 'userdata/documents/sample.pdf')
      .then(response => {
        expect(response.body.document).to.exist;
        let doc = response.body.document;
        expect(doc.type).to.equal('application/pdf');
        expect(doc.path).to.equal(undefined, 'Document should not have a path property');
      });
  });

  it('successfully saves a file to disk', () => {
    return request()
      .post(url)
      .set('Authorization', token)
      .attach('attachment', 'userdata/documents/sample.txt')
      .then(response => {
        let docId = response.body.document.id;
        return Document.findById(docId);
      })
      .then(doc => {
        let error = fs.accessSync(doc.path);
        expect(error).to.equal(undefined);
      });
  });



});
