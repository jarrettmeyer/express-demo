const expect = require('chai').expect;
const findByEmail = require('../../../services').users.findByEmail;

describe('users/findByEmail', () => {

  it('returns a single user', function () {
    return findByEmail('admin@example.com')
      .then(function (result) {
        expect(result.id).to.be.greaterThan(0);
      })
      .catch();
  });

  it('returns null when no user is found', () => {
    return findByEmail('zzzzz@example.com')
      .then(function (result) {
        expect(result).to.equal(null);
      });
  })

});
