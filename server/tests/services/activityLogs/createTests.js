const activityLogs = require('../../../services').activityLogs;
const expect = require('chai').expect;

describe('activityLogs/create()', () => {

  it('sets an id', () => {
    return activityLogs.create({ description: 'this is a test' })
      .then(function (result) {
        expect(result.id).to.be.greaterThan(0);
      });
  });

});
