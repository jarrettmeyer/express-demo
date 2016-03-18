var assert = require('chai').assert;
var expect = require('chai').expect;
var ValidationError = require('../../../errors/ValidationError');
var validation = require('../../../services/validation');

describe('validation', () => {


  describe('propertyName', () => {

    it('can be customized', () => {
      var model = {
        name: null
      };
      var rules = {
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
      var obj = { name: null };
      var rules = { name: { required: true } };
      return validation.validate(obj, rules)
        .then(assert.fail)
        .catch(ValidationError, error => {
          expect(error.errors[0].message).to.equal('name is required.');
        });
    });

    it('returns no errors when model is valid', () => {
      var obj = { name: 'John Doe' };
      var rules = { name: { required: true } };
      return validation.validate(obj, rules)
        .catch(assert.fail);
    });

  });


  describe('typeof', () => {

    it('can test that a property matches typeof', () => {
      var obj = { name: 12345 };
      var rules = { name: { typeof: 'string' } };
      return validation.validate(obj, rules)
        .then(assert.fail)
        .catch(ValidationError, error => {
          expect(error.errors[0].message).to.equal('name must be of type string.');
        });
    });

    it('returns no errors when model is valid', () => {
      var obj = { name: 'John Doe' };
      var rules = { name: { typeof: 'string' } };
      return validation.validate(obj, rules)
        .catch(assert.fail);
    });

  });


});
