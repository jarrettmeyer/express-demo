'use strict';
const expect = require('chai').expect;
const isDocumentPublished = require('../../../services/helpers/isDocumentPublished');

describe('services/helpers/isDocumentRemoved', () => {

  it('returns false when document is not published', () => {
    let isPublished = isDocumentPublished({ published: false }, { published: false });
    expect(isPublished).to.equal(false);
  });

  it('returns false when document is previously published', () => {
    let isPublished = isDocumentPublished({ published: true }, { published: true });
    expect(isPublished).to.equal(false);
  });

  it('returns false when document is unpublished', () => {
    let isPublished = isDocumentPublished({ published: true }, { published: false });
    expect(isPublished).to.equal(false);
  });

  it('returns false when no new information is given', () => {
    let isPublished = isDocumentPublished({ published: true }, { });
    expect(isPublished).to.equal(false);
  });

  it('returns true when document is published', () => {
    let isPublished = isDocumentPublished({ published: false }, { published: true });
    expect(isPublished).to.equal(true);
  });

});
