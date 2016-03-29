'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const ValidationError = require('../../../errors/ValidationError');
const validation = require('../../../services/validation');

describe('validation', () => {


  describe('propertyName', () => {

    it('can be customized', () => {
      let model = {
        name: null
      };
      let rules = {
        name: {
          required: true,
          propertyName: 'My First Name'
        }
      };
      return validation.validate(model, rules)
        .then(assert.fail)
        .catch(ValidationError, error => {
          expect(error.errors[0].message).to.equal('My First Name is required.');
        });
    });

  });


  describe('required', () => {

    it('can require a property', () => {
      let obj = { name: null };
      let rules = { name: { required: true } };
      return validation.validate(obj, rules)
        .then(assert.fail)
        .catch(ValidationError, error => {
          expect(error.errors[0].message).to.equal('name is required.');
        });
    });

    it('returns no errors when model is valid', () => {
      let obj = { name: 'John Doe' };
      let rules = { name: { required: true } };
      return validation.validate(obj, rules)
        .catch(assert.fail);
    });

  });


  describe('typeof', () => {

    it('can test that a property matches typeof', () => {
      let obj = { name: 12345 };
      let rules = { name: { typeof: 'string' } };
      return validation.validate(obj, rules)
        .then(assert.fail)
        .catch(ValidationError, error => {
          expect(error.errors[0].message).to.equal('name must be of type string.');
        });
    });

    it('returns no errors when model is valid', () => {
      let obj = { name: 'John Doe' };
      let rules = { name: { typeof: 'string' } };
      return validation.validate(obj, rules)
        .catch(assert.fail);
    });

  });


});
