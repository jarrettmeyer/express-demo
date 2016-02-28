const create = require('../../../services/documents').create;
const Document = require('../../../models').Document;
const executeQuery = require('../../../data').executeQuery;
const expect = require('chai').expect;

describe('documents/create()', () => {

  var abstract = `This is a test document. It was created by a unit test at ${new Date()}.`;
  var docData = null;
  var title = null;

  beforeEach(() => {
    title = 'test document ' + Date.now().toString();
    docData = {
      ownerId: 1,
      title: title,
      abstract: abstract
    };
  })

  it('inserts a new activity log row');

  it('inserts a new document row', () => {
    return create(docData)
      .then((doc) => {
        expect(doc.id).to.be.greaterThan(0);
      });
  });

  it('returns a document instance', () => {
    return create(docData)
      .then(doc => {
        expect(doc).to.be.instanceOf(Document);
      })
  });

  it('sets published: false');

  it('sets removed: false');

});
