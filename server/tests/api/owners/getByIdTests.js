'use strict';

const Document = require('../../../models/Document');
const expect = require('chai').expect;
const getTokenForEmail = require('../getTokenForEmail');
const request = require('../setupRequest');
const testUnauthorizedRequest = require('../testUnauthorizedRequest');
const _ = require('lodash');

describe('GET /api/owners/:id', () => {

  let ownerId, url, validToken;

  beforeEach(() => {
    validToken = getTokenForEmail('admin@example.com');
    return Document.findAllPublished()
      .then(documents => {
        ownerId = documents[0].ownerId;
        url = `/api/owners/${ownerId}`;
        return null;
      });
  });

  it('returns a single owner', () => {
    return request()
      .get(url)
      .set('Authorization', validToken)
      .expect(200)
      .then(response => {
        expect(response.body.owner.id).to.equal(ownerId);
      });
  });

  it('returns valid owner objects with expected properties', () => {
    return request()
      .get(url)
      .set('Authorization', validToken)
      .then(response => {
        let allKeys = Object.keys(response.body.owner);
        expect(allKeys).to.contain('displayName');
        expect(allKeys).to.contain('email');
        expect(allKeys).to.contain('id');
        expect(allKeys.length).to.equal(3);
      });
  });

  it('returns 401 when no authorization token is given', function () {
    return testUnauthorizedRequest(request, 'get', url);
  });

  it('returns 404 when the owner is not found', function () {
    return request()
      .get('/api/owners/9999999')
      .set('Authorization', validToken)
      .expect(404);
  });

});
