const expect = require('chai').expect;
const saveFile = require('../../services/saveFileToDisk');

describe('services/saveFileToDisk', () => {

  it('saves a file', () => {
    return saveFile('Hello World!', { id: 123 })
      .then(result => {
        expect(result.path).to.match(/^userdata\/documents\/123\//);
      });
  });

});
