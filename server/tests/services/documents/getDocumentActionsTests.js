'use strict';

const Document = require('../../../models/Document');
const expect = require('chai').expect;
const getDocumentActions = require('../../../services/documents/getDocumentActions');

describe('documents/getDocumentActions()', () => {

  it('recognizes an edit action', () => {
    let a = new Document({ title: 'original title' });
    let b = new Document({ title: 'updated title' });
    let actions = getDocumentActions(a, b);
    expect(actions[0].action).to.equal('edit document');
  });


  it('recognizes a publish action', () => {
    let a = new Document({ published: false });
    let b = new Document({ published: true });
    let actions = getDocumentActions(a, b);
    expect(actions[0].action).to.equal('publish document');
  });


  it('recognizes an unpublish action', () => {
    let a = new Document({ published: true });
    let b = new Document({ published: false });
    let actions = getDocumentActions(a, b);
    expect(actions[0].action).to.equal('unpublish document');
  });


  it('recognizes multiple actions (edit and publish)', () => {
    let a = new Document({ title: 'original title', published: false });
    let b = new Document({ title: 'updated title', published: true });
    let actions = getDocumentActions(a, b);
    expect(actions[0].action).to.equal('edit document');
    expect(actions[1].action).to.equal('publish document');
  });

});
