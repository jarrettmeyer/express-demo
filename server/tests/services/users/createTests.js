const create = require('../../../services').users.create;
const expect = require('chai').expect;

describe('users/create()', () => {

  it('creates a user', () => {
    var email = Date.now().toString() + '@example.com';
    var user = { email: email, clearPassword: 'test', admin: false, removed: false };
    return create(user)
      .then((result) => {
        expect(result.id).to.be.greaterThan(0);
      });
  });

  it('is a function', () => {
    expect(typeof create).to.equal('function');
  });

});