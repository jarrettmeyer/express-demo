'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const validate = require('../../../services/documents/validate');
const ValidationError = require('../../../errors/ValidationError');

describe('services/documents/validate', () => {


  function createValidDocument() {
    return {
      ownerId: 10,
      title: 'This is a valid document',
      abstract: 'This is an example of a valid document'
    };
  }


  it('abstact: must be a string', () => {
    let document = createValidDocument();
    document.abstract = 9999;
    return validate(document)
      .then(assert.fail)
      .catch(ValidationError, error => {
        expect(error.errors[0].message).to.equal('abstract must be of type string.');
      });
  });


  it('allows a valid document', () => {
    let document = createValidDocument();
    return validate(document);
  });


  it('ownerId: required', () => {
    let document = createValidDocument();
    document.ownerId = null;
    return validate(document)
      .then(assert.fail)
      .catch(ValidationError, error => {
        expect(error.errors[0].message).to.equal('ownerId is required.');
      });
  });


  it('ownerId: must be greater than 0', () => {
    let document = createValidDocument();
    document.ownerId = 0;
    return validate(document)
      .then(assert.fail)
      .catch(ValidationError, error => {
        expect(error.errors[0].message).to.equal('ownerId cannot be less than 1.');
      });
  });


  it('title: required', () => {
    let document = createValidDocument();
    document.title = null;
    return validate(document)
      .then(assert.fail)
      .catch(ValidationError, error => {
        expect(error.errors[0].message).to.equal('title is required.');
      });
  });


  it('title: must be a string', () => {
    let document = createValidDocument();
    document.title = 11111;
    return validate(document)
      .then(assert.fail)
      .catch(ValidationError, error => {
        expect(error.errors[0].message).to.equal('title must be of type string.');
      });
  });


});
