'use strict';

const expect = require('chai').expect;
const request = require('./setupRequest');

describe('GET /api/status', () => {

  it('returns a timestamp', () => {
    let start = Date.now();
    return request()
      .get('/api/status')
      .then(function (response) {
        let body = response.body;
        expect(body.timestamp).to.be.closeTo(start, 100);
      });
  });

  it('works', () => {
    return request()
      .get('/api/status')
      .expect(200);
  });

});
