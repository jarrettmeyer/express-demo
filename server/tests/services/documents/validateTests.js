const assert = require('chai').assert;
const expect = require('chai').expect;
const validate = require('../../../services/documents/validate');
const ValidationError = require('../../../errors/ValidationError');

describe('services/documents/validate', () => {


  it('abstact: must be a string', () => {
    var document = createValidDocument();
    document.abstract = 9999;
    return validate(document)
      .then(assert.fail)
      .catch(ValidationError, error => {
        expect(error.errors[0].message).to.equal('abstract must be of type string.');
      });
  });


  it('allows a valid document', () => {
    var document = createValidDocument();
    return validate(document);
  });


  it('ownerId: required', () => {
    var document = createValidDocument();
    document.ownerId = null;
    return validate(document)
      .then(assert.fail)
      .catch(ValidationError, error => {
        expect(error.errors[0].message).to.equal('ownerId is required.');
      });
  });


  it('ownerId: must be greater than 0', () => {
    var document = createValidDocument();
    document.ownerId = 0;
    return validate(document)
      .then(assert.fail)
      .catch(ValidationError, error => {
        expect(error.errors[0].message).to.equal('ownerId cannot be less than 1.');
      });
  });


  it('title: required', () => {
    var document = createValidDocument();
    document.title = null;
    return validate(document)
      .then(assert.fail)
      .catch(ValidationError, error => {
        expect(error.errors[0].message).to.equal('title is required.');
      });
  });


  it('title: must be a string', () => {
    var document = createValidDocument();
    document.title = 11111;
    return validate(document)
      .then(assert.fail)
      .catch(ValidationError, error => {
        expect(error.errors[0].message).to.equal('title must be of type string.');
      });
  });


  function createValidDocument() {
    return {
      ownerId: 10,
      title: 'This is a valid document',
      abstract: 'This is an example of a valid document'
    };
  }


});
