'use strict';

const expect = require('chai').expect;
const getTokenForEmail = require('../getTokenForEmail');
const request = require('../setupRequest');
const testUnauthorizedRequest = require('../testUnauthorizedRequest');

const url = '/api/documents';

describe('POST /api/documents', () => {

  var postData, title, validToken;

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

  it('returns 201', () => {
    return request()
      .post(url)
      .set('Authorization', validToken)
      .send(postData)
      .expect(201)
      .then(response => {
        var location = response.headers['location'];
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
        expect(response.body.errors[0].message).to.equal('title is required.');
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
