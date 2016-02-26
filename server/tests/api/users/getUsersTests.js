'use strict';

const expect = require('chai').expect;
const getTokenForEmail = require('../../getTokenForEmail');
const request = require('../setupRequest');

describe('GET /api/users', () => {

  it('returns a collection of users', () => {
    return request()
      .get('/api/users')
      .set('Authorization', getTokenForEmail('admin@example.com'))
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).to.equal(true);
        expect(response.body.length).to.be.at.least(3);
      });
  });

});
