/* jshint expr: true */
/* global -Promise */
'use strict';

const argv = require('../../utils/argv');
const authenticateWithToken = require('../../security/authenticateWithToken');
const expect = require('chai').expect;
const getTokenForEmail = require('../api/getTokenForEmail');
const Promise = require('bluebird');

describe('security/authenticateWithToken()', () => {

  let email = null;
  let isNextCalled = false;
  let nextArgs = null;
  let request = null;
  let response = null;

  beforeEach(() => {
    email = 'dorothy@example.com';
    isNextCalled = false;
    nextArgs = [];
    request = {
      headers: {
        authorization: null
      }
    };
  });

  it('fails when token is expired', () => {
    request.headers.authorization = getTokenForEmail('elizabeth@example.com', { expiresDays: -2 });
    return authenticateWithToken(request, response, next)
      .then(() => {
        expect(isNextCalled).to.equal(true);
        expect(request.user).to.be.undefined;
      });
  });

  it('fails when token is not the expected format', () => {
    let token = getTokenForEmail(email);
    request.headers.authorization = token.split(' ')[1];
    return authenticateWithToken(request, response, next)
      .then(() => {
        expect(isNextCalled).to.equal(true);
        expect(request.user).to.be.undefined;
      });
  });

  it('fails when token issued timestamp does not match', () => {
    request.headers.authorization = getTokenForEmail(email, { now: new Date() });
    return authenticateWithToken(request, response, next)
      .then(() => {
        expect(isNextCalled).to.equal(true);
        expect(nextArgs.length).to.equal(1);
        expect(request.user).to.be.undefined;
      });
  });

  it('fails when user has been removed', () => {
    request.headers.authorization = getTokenForEmail('betty@example.com');
    return authenticateWithToken(request, response, next)
      .then(() => {
        expect(isNextCalled).to.equal(true);
        expect(nextArgs.length).to.equal(1);
        expect(request.user).to.be.undefined;
      });
  });

  it('succeeds when all conditions are met', () => {
    request.headers.authorization = getTokenForEmail('elizabeth@example.com', { expiresDays: 999999 });
    return authenticateWithToken(request, response, next)
      .then(() => {
        expect(isNextCalled).to.equal(true);
        expect(nextArgs.length).to.equal(0);
        expect(request.user).to.exist;
        expect(request.user.id).to.be.greaterThan(0);
      });
  });

  function next() {
    isNextCalled = true;
    nextArgs = argv(arguments);
    return Promise.resolve();
  }

});
