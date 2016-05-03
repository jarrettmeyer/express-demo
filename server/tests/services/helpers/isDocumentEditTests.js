'use strict';
const expect = require('chai').expect;
const isDocumentEdit = require('../../../services/helpers/isDocumentEdit');

describe('services/helpers/isDocumentEdit', () => {

  it('returns false when nothing has changed', () => {
    let isEdit = isDocumentEdit({ abstract: 'x', title: 'y' }, { abstract: 'x', title: 'y' });
    expect(isEdit).to.equal(false);
  });

  it('returns false when nothing has changed and abstract is not present', () => {
    let isEdit = isDocumentEdit({ abstract: 'x', title: 'y' }, { title: 'y' });
    expect(isEdit).to.equal(false);
  });

  it('returns false when nothing has changed and title is not present', () => {
    let isEdit = isDocumentEdit({ abstract: 'x', title: 'y' }, { abstract: 'x' });
    expect(isEdit).to.equal(false);
  });

  it('returns false when new document is empty', () => {
    let isEdit = isDocumentEdit({ abstract: 'x', title: 'y' }, { });
    expect(isEdit).to.equal(false);
  });

  it('returns true when abstract has changed', () => {
    let isEdit = isDocumentEdit({ abstact: 'value 1' }, { abstract: 'value 2' });
    expect(isEdit).to.equal(true);
  });

  it('returns true when title has changed', () => {
    let isEdit = isDocumentEdit({ title: 'value 1' }, { title: 'value 2' });
    expect(isEdit).to.equal(true);
  });


});
