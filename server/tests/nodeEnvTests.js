'use strict';

const expect = require('chai').expect;

describe('NODE_ENV', () => {

  it('is in test mode', () => {
    let nodeEnv = process.env.NODE_ENV;
    expect(nodeEnv).to.equal('test');
  });

});
