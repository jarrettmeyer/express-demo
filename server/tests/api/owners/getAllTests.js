'use strict';

const expect = require('chai').expect;
const getTokenForEmail = require('../getTokenForEmail');
const request = require('../setupRequest');
const testUnauthorizedRequest = require('../testUnauthorizedRequest');
const _ = require('lodash');

describe('GET /api/owners', () => {

  let validToken;

  beforeEach(() => {
    validToken = getTokenForEmail('admin@example.com');
  });

  it('returns a collection of owners', () => {
    return request()
      .get('/api/owners')
      .set('Authorization', validToken)
      .expect(200)
      .then(response => {
        expect(Array.isArray(response.body.owners)).to.equal(true);
        expect(response.body.owners.length).to.be.at.least(2);
      });
  });

  it('returns valid owner objects with expected properties', () => {
    return request()
      .get('/api/owners')
      .set('Authorization', validToken)
      .then(response => {
        let allKeys = [];
        response.body.owners.forEach(owner => {
          allKeys = allKeys.concat(Object.keys(owner));
        });
        allKeys = _.uniq(allKeys);
        expect(allKeys).to.contain('displayName');
        expect(allKeys).to.contain('email');
        expect(allKeys).to.contain('id');
        expect(allKeys.length).to.equal(3);
      });
  });

  it('returns 401 when no authorization token is given', function () {
    return testUnauthorizedRequest(request, 'get', '/api/owners');
  });

});
