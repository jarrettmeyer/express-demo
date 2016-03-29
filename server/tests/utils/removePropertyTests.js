/* jshint expr: true */
'use strict';

const expect = require('chai').expect;
const removeProperty = require('../../utils/removeProperty');

describe('removeProperty', () => {

  it('removes a value property from the top level', () => {
    let data = { a: 1, b: 2, c: 3 };
    removeProperty(data, 'c');
    expect(data.a).to.equal(1);
    expect(data.b).to.equal(2);
    expect(data.c).to.not.exist;
  });

  it('removes an object property from the top level', () => {
    let data = { a: 1, b: 2, c: { d: 3, e: 4 } };
    removeProperty(data, 'c');
    expect(data.a).to.equal(1);
    expect(data.b).to.equal(2);
    expect(data.c).to.not.exist;
  });

  it('removes a nested value property (2 levels)', () => {
    let data = { a: 1, b: { c: 2, d: 3 } };
    removeProperty(data, 'c');
    expect(data.a).to.equal(1);
    expect(data.b.c).to.not.exist;
    expect(data.b.d).to.equal(3);
  });

  it('removes a nested value property (3 levels)', () => {
    let data = { a: 1, b: { c: 2, d: { e: 3, f: 4 } } };
    removeProperty(data, 'e');
    expect(data.a).to.equal(1);
    expect(data.b.c).to.equal(2);
    expect(data.b.d.e).to.not.exist;
    expect(data.b.d.f).to.equal(4);
  });

  it('removes an array of properties from an object', () => {
    let data = {
      user: {
        email: 'alice@example.com',
        password: 'secret',
        passwordConfirmation: 'secret'
      }
    };
    removeProperty(data, ['password', 'passwordConfirmation']);
    expect(data.user.email).to.equal('alice@example.com');
    expect(data.user.password).to.not.exist;
    expect(data.user.passwordConfirmation).to.not.exist;
  });

});
