'use strict';

const expect = require('chai').expect;
const getTokenForEmail = require('../getTokenForEmail');
const request = require('../setupRequest');
const testUnauthorizedRequest = require('../testUnauthorizedRequest');

describe('GET /api/users', () => {

  let validToken;

  beforeEach(() => {
    validToken = getTokenForEmail('admin@example.com');
  });

  it('returns a collection of users', () => {
    return request()
      .get('/api/owners')
      .set('Authorization', validToken)
      .expect(200)
      .then(response => {
        expect(Array.isArray(response.body.owners)).to.equal(true);
        expect(response.body.owners.length).to.be.at.least(2);
      });
  });

  it('returns 401 when no authorization token is given', function () {
    return testUnauthorizedRequest(request, 'get', '/api/owners');
  });

});
