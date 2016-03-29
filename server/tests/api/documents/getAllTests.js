/* jshint expr: true */
'use strict';

const expect = require('chai').expect;
const getTokenForEmail = require('../getTokenForEmail');
const request = require('../setupRequest');
const testUnauthorizedRequest = require('../testUnauthorizedRequest');
const users = require('../../../services/users');
const _ = require('lodash');

const url = '/api/documents';

describe('GET /api/documents', () => {

  let currentUser, validToken;

  beforeEach(() => {
    let email = 'alice@example.com';
    return users.findByEmail(email)
      .then(_user => {
        currentUser = _user;
        validToken = getTokenForEmail(email);
      });
  });

  it('does not expose a path property', () => {
    return sendRequest()
      .then(response => {
        let documents = response.body.documents;
        let hasPathProperty = documents.filter(doc => {
          return doc.hasOwnProperty('path');
        });
        expect(hasPathProperty.length).to.equal(0);
      });
  });

  it('does not return removed documents', () => {
    return sendRequest()
      .then(response => {
        let documents = response.body.documents;
        let found = documents.filter(doc => {
          return doc.removed === true;
        });
        expect(found.length).to.equal(0);
      });
  });

  it('does not return unpublished documents for other users', () => {
    return sendRequest()
      .then(response => {
        let documents = response.body.documents;
        let found = documents.filter(doc => {
          return doc.published === false && doc.ownerId !== currentUser.id;
        });
        expect(found.length).to.equal(0);
      });
  });

  it('returns 200', () => {
    return sendRequest()
      .expect(200);
  });

  it('returns 401 if no token is given', () => {
    return testUnauthorizedRequest(request, 'get', url);
  });

  it('returns a collection of documents', () => {
    return sendRequest()
      .then(response => {
        expect(response.body.documents).to.exist;
        expect(response.body.documents.length).to.be.greaterThan(0);
      });
  });

  it('returns published documents for other users', () => {
    return sendRequest()
      .then(response => {
        let documents = response.body.documents;
        let found = documents.filter(doc => {
          return doc.published === true && doc.ownerId !== currentUser.id;
        });
        expect(found.length).to.be.greaterThan(0);
      });
  });

  it('returns unpublished documents for the current user', () => {
    return sendRequest()
      .then(response => {
        let documents = response.body.documents;
        let found = documents.filter(doc => {
          return doc.published === false && doc.ownerId === currentUser.id;
        });
        expect(found.length).to.be.greaterThan(0);
      });
  });

  function sendRequest() {
    return request()
      .get(url)
      .set('Authorization', validToken);
  }

});
