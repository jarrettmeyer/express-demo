/* jshint expr: true */
'use strict';
const expect = require('chai').expect;
const updateUserTokenIssuedAt = require('../../services/updateUserTokenIssuedAt');
const User = require('../../models/User');


describe('services/updateUserTokenIssuedAt', () => {

  let alice = null, betty = null, issuedAt = null;

  beforeEach(() => {
    issuedAt = new Date();
    return User.findOneByEmail('alice@example.com')
      .then(user => {
        alice = user;
        return User.findOneByEmail('betty@example.com');
      })
      .then(user => {
        betty = user;
      });
  });

  it('fails when the user has been removed', () => {
    return updateUserTokenIssuedAt(betty.id, issuedAt)
      .then(affected => {
        expect(affected).to.equal(0);
      });
  });

  it('sets token issued at for a user', () => {
    return updateUserTokenIssuedAt(alice.id, issuedAt)
      .then(() => {
        return User.findById(alice.id);
      })
      .then(user => {
        expect(user.tokenIssuedAt).to.exist;
        expect(user.tokenIssuedAt.toString()).to.equal(issuedAt.toString());
      });
  });

});
