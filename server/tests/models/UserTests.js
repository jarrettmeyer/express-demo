'use strict';
const expect = require('chai').expect;
const User = require('../../models/User');

describe('models/User', () => {

  it('can save a user', () => {
    let email = `${Date.now()}@example.com`;
    return User.create({ displayName: 'save user test', email: email, hashedPassword: 's3cr3t' })
      .then(user => {
        expect(user.id).to.be.greaterThan(0);
      });
  });

  it('requires a display name', () => {
    let email = `${Date.now()}@example.com`;
    return User.create({ email: email, hashedPassword: 's3cr3t' })
      .then(() => {
        // The create should fail!
        expect(true).to.equal(false);
      })
      .catch(error => {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.errors[0].message).to.equal('displayName cannot be null');
      });
  });

  it('requires an email address', () => {
    return User.create({ displayName: 'save user test', hashedPassword: 's3cr3t' })
      .then(() => {
        // The create should fail!
        expect(true).to.equal(false);
      })
      .catch(error => {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.errors[0].message).to.equal('email cannot be null');
      });
  });

  it('requires a unique email address', () => {
    let email = 'alice@example.com';
    return User.create({ displayName: 'save user test', email: email, hashedPassword: 's3cr3t' })
      .then(() => {
        // The create should fail!
        expect(true).to.equal(false);
      })
      .catch(error => {
        expect(error.name).to.equal('SequelizeUniqueConstraintError');
        expect(error.errors[0].message).to.equal('email must be unique');
      });
  });

  it('requires a valid email address format', () => {
    return User.create({ displayName: 'save user test', email: 'bad.format.', hashedPassword: 's3cr3t' })
      .then(() => {
        // The create should fail!
        expect(true).to.equal(false);
      })
      .catch(error => {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.errors[0].message).to.equal('Validation isEmail failed');
      });
  });

});
