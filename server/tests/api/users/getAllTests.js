'use strict';

const expect = require('chai').expect;
const getTokenForEmail = require('../getTokenForEmail');
const request = require('../setupRequest');
const testUnauthorizedRequest = require('../testUnauthorizedRequest');
const testForbiddenRequest = require('../testForbiddenRequest');

describe('GET /api/users', () => {

  var validToken;

  beforeEach(() => {
    validToken = getTokenForEmail('admin@example.com');
  });

  it('returns a collection of users', () => {
    return request()
      .get('/api/users')
      .set('Authorization', validToken)
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).to.equal(true);
        expect(response.body.length).to.be.at.least(3);
      });
  });

  it('returns 401 when no authorization token is given', function () {
    return testUnauthorizedRequest(request, 'get', '/api/users');
  });

  it('returns 403 when access is forbidden', function () {
    return testForbiddenRequest(request, 'get', '/api/users', 'elizabeth@example.com');
  });

});
