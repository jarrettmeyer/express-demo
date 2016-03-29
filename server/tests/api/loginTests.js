/* jshint expr: true */

const expect = require('chai').expect;
const request = require('./setupRequest');
const users = require('../../services/users');

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

  it('updates the user tokenIssuedAt property', () => {
    return request()
      .post('/api/login')
      .send({ email: 'claire@example.com', password: 'test' })
      .then(() => {
        return users.findByEmail('claire@example.com');
      })
      .then(user => {
        expect(user.tokenIssuedAt.getTime()).to.be.closeTo(Date.now(), 200);
      });
  });

});
