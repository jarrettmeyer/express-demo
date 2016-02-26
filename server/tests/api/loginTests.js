const expect = require('chai').expect;
const request = require('./setupRequest');

describe('POST /api/login', () => {

  it('returns a token when successful', () => {
    return request()
      .post('/api/login')
      .send({ email: 'alice@example.com', password: 'test' })
      .expect(200)
      .then((result) => {
        expect(result.body.token).to.exist;
      });
  });

  it('returns 401 when unsuccessful', () => {
    return request()
      .post('/api/login')
      .send({ email: 'alice@example.com', password: 'junk' })
      .expect(401);
  });

});
