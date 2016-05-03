/* jshint expr: true */
'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const updateUserTokenIssuedAt = require('../../services/updateUserTokenIssuedAt');
const User = require('../../models/User');


describe('services/updateUserTokenIssuedAt', () => {

  let alice = null, betty = null, issuedAt = null;

  beforeEach(() => {
    issuedAt = new Date();
    return User.findByEmail('alice@example.com')
      .then(user => {
        alice = user;
        return User.findByEmail('betty@example.com');
      })
      .then(user => {
        betty = user;
      });
  });

  it('fails when the user has been removed', () => {
    return updateUserTokenIssuedAt(betty.id, issuedAt)
      .then(() => {
        assert.fail();
      })
      .catch(error => {
        expect(error.name).to.equal('Error');
        expect(error.message).to.equal(`Now rows to update. User id: ${betty.id}.`);
      });
  });

  it('sets token issued at for a user', () => {
    return updateUserTokenIssuedAt(alice.id, issuedAt)
      .then(user => {
        expect(user.tokenIssuedAt).to.exist;
        expect(user.tokenIssuedAt.toString()).to.equal(issuedAt.toString());
      });
  });

});
