const expect = require('chai').expect;
const findAllOwners = require('../../../services').users.findAllOwners;
const Owner = require('../../../models').Owner;

describe('users/findAllOwners', () => {

  it('returns a collection of owners', function () {
    return findAllOwners()
      .then(function (result) {
        expect(result.length).to.be.greaterThan(0);
        var owners = result.filter(owner => {
          return owner instanceof Owner;
        });
        expect(result.length).to.equal(owners.length);
      });
  });

});
