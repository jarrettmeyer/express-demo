const authentication = require('../../../services/authentication');
const expect = require('chai').expect;

describe('authentication/decodeToken()', () => {

  it('decodes a token', () => {
    var token = authentication.createToken({ email: 'user@example.com' });
    var decoded = authentication.decodeToken(token);
    expect(typeof decoded).to.equal('object');
    expect(decoded.email).to.equal('user@example.com');
  });

});
