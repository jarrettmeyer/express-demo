const expect = require('chai').expect;
const request = require('./setupRequest');

describe('GET /api/status', () => {

  it('returns a timestamp', () => {
    var start = Date.now();
    return request()
      .get('/api/status')
      .then(function (response) {
        var body = response.body;
        expect(body.timestamp).to.be.closeTo(start, 100);
      });
  });

  it('works', () => {
    return request()
      .get('/api/status')
      .expect(200);
  });

});
