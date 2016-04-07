'use strict';
const expect = require('chai').expect;
const lastElement = require('../../utils/lastElement');

describe('utils/lastElement()', () => {

  it('returns the expected element', () => {
    expect(lastElement([1, 2, 3, 4, 5])).to.equal(5);
  });

  it('returns undefined if array is empty', () => {
    // jshint -W030
    expect(lastElement([])).to.not.exist;
    // jshint +W030
  });

  it('returns undefined if array is undefined', () => {
    // jshint -W030
    expect(lastElement()).to.not.exist;
    // jshint +W030
  });

});
