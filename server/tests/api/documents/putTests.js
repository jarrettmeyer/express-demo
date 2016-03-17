const assert = require('chai').assert;
const debug = require('debug')('test');
const expect = require('chai').expect;
const findById = require('../../../services/documents/findById');
const getTokenForEmail = require('../getTokenForEmail');
const request = require('../setupRequest');
const testUnauthorizedRequest = require('../testUnauthorizedRequest');

describe('PUT /api/documents/:id', () => {

  var document, email, token, url;

  beforeEach(() => {
    email = 'alice@example.com';
    token = getTokenForEmail(email);
    // debug(`Token = ${token}`);
    return createDocument();
  });

  it('fails (401) if the user is not logged in', () => {
    return testUnauthorizedRequest(request, 'put', url);
  });

  it('fails (403) if the document owner is not the current user', () => {
    var altToken = getTokenForEmail('claire@example.com');
    return request()
      .put(url)
      .set('Authorization', altToken)
      .expect(403);
  });

  it('fails (404) if the document id is not valid', function () {
    return request()
      .put('/api/documents/999999999')
      .set('Authorization', token)
      .send({ document: { title: 'Hello World!' } })
      .expect(404);
  });

  it('returns a 200 status', () => {
    return request()
      .put(url)
      .set('Authorization', token)
      .send({ document: { title: 'Hello World' } })
      .expect(200);
  });

  it('returns a document object', () => {
    var newTitle = `Hello World ${Date.now()}`;
    return request()
      .put(url)
      .set('Authorization', token)
      .send({ document: { title: newTitle } })
      .then(response => {
        expect(response.body.document).to.exist;
        var doc = response.body.document;
        expect(doc.title).to.equal(newTitle);
      });
  });

  function createDocument() {
    var postData = {
      document: {
        title: `test document ${Date.now()}`,
        abstract: `This is a test for updating a document.`
      }
    }
    return request()
      .post('/api/documents')
      .set('Authorization', token)
      .send(postData)
      .expect(201)
      .then(response => {
        // debug(`response: ${response}`);
        document = response.body.document;
        url = `/api/documents/${document.id}`;
        // debug(`Using URL: ${url}`);
        return document;
      })
      .catch(error => {
        assert.fail(error);
      });
  }

});
