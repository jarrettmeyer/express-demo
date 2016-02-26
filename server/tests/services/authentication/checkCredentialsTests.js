const assert = require('chai').assert;
const checkCredentials = require('../../../services/authentication/checkCredentials');
const expect = require('chai').expect;

describe('authentication/checkCredentials()', () => {

  it('returns a user when credentials are valid', () => {
    return checkCredentials({ email: 'alice@example.com', password: 'test' })
      .then((result) => {
        expect(result.id).to.be.greaterThan(0);
        expect(result.removed).to.equal(false);
      });
  });

  it('throws InvalidCredentials when email does not exist', () => {
    return checkCredentials({ email: 'zzzzz@example.com', password: 'test' })
      .then(() => {
        assert.fail();
      })
      .catch((error) => {
        expect(error.name).to.equal('InvalidCredentials');
      });
  });

  it('throws InvalidCredentials when password does not match', () => {
    return checkCredentials({ email: 'zzzzz@example.com', password: 'bad_password' })
      .then(() => {
        assert.fail();
      })
      .catch((error) => {
        expect(error.name).to.equal('InvalidCredentials');
      });
  });

  it('throws InvalidCredentials when user has been removed', () => {
    return checkCredentials({ email: 'betty@example.com', password: 'test' })
      .then(() => {
        assert.fail();
      })
      .catch((error) => {
        expect(error.name).to.equal('InvalidCredentials');
      });
  });

});
