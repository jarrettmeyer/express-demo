'use strict';

const comparePassword = require('../../../services/authentication/comparePassword');
const expect = require('chai').expect;
const hashPassword = require('../../../services/authentication/hashPassword');

describe('authentication/comparePassword()', () => {

  it('returns false when password is not a match', () => {
    let clearPassword = 'hello';
    let hashedPassword = hashPassword(clearPassword);
    let result = comparePassword('junk', hashedPassword);
    expect(result).to.equal(false);
  });

  it('returns true when password is a match', () => {
    let clearPassword = 'hello';
    let hashedPassword = hashPassword(clearPassword);
    let result = comparePassword(clearPassword, hashedPassword);
    expect(result).to.equal(true);
  });

});
