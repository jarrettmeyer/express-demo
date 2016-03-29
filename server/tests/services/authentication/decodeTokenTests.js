'use strict';

const authentication = require('../../../services/authentication');
const expect = require('chai').expect;

describe('authentication/decodeToken()', () => {

  it('decodes a token', () => {
    let token = authentication.createToken({ email: 'user@example.com' });
    let decoded = authentication.decodeToken(token);
    expect(typeof decoded).to.equal('object');
    expect(decoded.email).to.equal('user@example.com');
  });

});
