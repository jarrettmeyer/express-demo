const argv = require('../../utils/argv');
const expect = require('chai').expect;

describe('utils/getArguments()', () => {

  var args = null;

  function dummy() {
    return argv(arguments);
  }

  it('can return an array of arguments', () => {
    var result = dummy(1, 'hello', Math.PI, new Date());
    expect(result.length).to.equal(4);
    expect(result[0]).to.equal(1);
    expect(result[1]).to.equal('hello');
    expect(result[2]).to.equal(Math.PI);
    expect(result[3].getTime()).to.be.closeTo(Date.now(), 20);
  });

  it('can return an empty array', () => {
    var result = dummy();
    expect(result.length).to.equal(0);
  });

});
