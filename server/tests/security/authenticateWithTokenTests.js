const authenticateWithToken = require('../../security/authenticateWithToken');
const expect = require('chai').expect;
const getTokenForEmail = require('../api/getTokenForEmail');

describe('security/authenticateWithToken()', () => {

  var email = null;
  var isNextCalled = false;
  var request = null;
  var response = null;

  beforeEach(() => {
    email = 'dorothy@example.com';
    isNextCalled = false;
    nextArgs = null;
    request = {
      headers: {
        authorization: null
      }
    }
  });

  it('fails when token is expired', () => {
    return getTokenForEmail('elizabeth@example.com')
      .then(token => {
        request.headers.authorization = token;
        return authenticateWithToken(request, response, next)
      })
      .then(() => {
        expect(isNextCalled).to.equal(true);
        expect(request.user).to.be.undefined;
      });
  });

  it('fails when token is not the expected format', () => {
    return getTokenForEmail(email)
      .then(token => {
        request.headers.authorization = token.split(' ')[1];
        return authenticateWithToken(request, response, next)
      })
      .then(() => {
        expect(isNextCalled).to.equal(true);
        expect(request.user).to.be.undefined;
      });
  });

  it('fails when token issued timestamp does not match', () => {
    return getTokenForEmail(email, new Date())
      .then(token => {
        request.headers.authorization = token;
        return authenticateWithToken(request, response, next)
      })
      .then(() => {
        expect(isNextCalled).to.equal(true);
        expect(request.user).to.be.undefined;
      });
  });

  it('fails when user has been removed', () => {
    return getTokenForEmail('betty@example.com')
      .then(token => {
        request.headers.authorization = token;
        return authenticateWithToken(request, response, next)
      })
      .then(() => {
        expect(isNextCalled).to.equal(true);
        expect(request.user).to.be.undefined;
      });
  });

  it('succeeds when all conditions are met', () => {
    return getTokenForEmail(email)
      .then(token => {
        request.headers.authorization = token;
        return authenticateWithToken(request, response, next)
      })
      .then(() => {
        expect(isNextCalled).to.equal(true);
        expect(request.user).to.exist;
        expect(request.user.id).to.be.greaterThan(0);
      });
  });

  function next() {
    isNextCalled = true;
  }

});
