'use strict';
const expect = require('chai').expect;
const isDocumentRemoved = require('../../../services/helpers/isDocumentRemoved');

describe('services/helpers/isDocumentRemoved', () => {

  it('returns false when document is not removed', () => {
    let isRemoved = isDocumentRemoved({ removed: false }, { removed: false });
    expect(isRemoved).to.equal(false);
  });

  it('returns false when document is previously removed', () => {
    let isRemoved = isDocumentRemoved({ removed: true }, { removed: true });
    expect(isRemoved).to.equal(false);
  });

  it('returns false when document is not restored', () => {
    let isRemoved = isDocumentRemoved({ removed: true }, { removed: false });
    expect(isRemoved).to.equal(false);
  });


  it('returns true when document is removed', () => {
    let isRemoved = isDocumentRemoved({ removed: false }, { removed: true });
    expect(isRemoved).to.equal(true);
  });

});
