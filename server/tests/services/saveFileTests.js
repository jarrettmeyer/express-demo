const expect = require('chai').expect;
const saveFile = require('../../../services/files/saveFile');

describe('files/saveFile', () => {

  it('saves a file', () => {
    return saveFile('Hello World!', { id: 123 })
      .then(result => {
        expect(result.path).to.match(/^userdata\/documents\/123\//);
      });
  });

});
