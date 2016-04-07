'use strict';
const activityLogs = require('../../../services/activityLogs');
const documents = require('../../../services/documents');
const expect = require('chai').expect;
const _ = require('lodash');

describe('services/documents/update', () => {

  let document = null;

  beforeEach(() => {
    let documentData = {
      ownerId: 100,
      title: 'Test for Update Document ' + Date.now().toString(),
      abstract: 'This is a sample document. It will be updated',
      originalFilename: 'sample.pdf',
      path: 'path/to/sample.pdf',
      type: 'application/pdf',
      published: false,
      removed: false
    };
    return documents.create(documentData)
      .then(_doc => {
        document = _doc;
        return document;
      });
  });

  it('should update title, abstract, and published', () => {
    let newTitle = 'Updated Title ' + Date.now().toString();
    let newAbstract = 'Updated abstract on ' + new Date();
    document.title = newTitle;
    document.abstract = newAbstract;
    document.published = true;
    return documents.update(document)
      .then(updatedDoc => {
        expect(updatedDoc.title).to.equal(newTitle);
        expect(updatedDoc.abstract).to.equal(newAbstract);
        expect(updatedDoc.published).to.equal(true);
      });
  });

  it('should not update file data', () => {
    document.originalFilename = 'some_new_file.xml';
    document.path = 'path/to/some_new_file.xml';
    document.type = 'text/xml';
    return documents.update(document)
      .then(updatedDoc => {
        expect(updatedDoc.originalFilename).to.equal('sample.pdf');
        expect(updatedDoc.path).to.equal('path/to/sample.pdf');
        expect(updatedDoc.type).to.equal('application/pdf');
      });
  });

  it('should not update the removed flag', () => {
    document.removed = true;
    return documents.update(document)
      .then(updatedDoc => {
        expect(updatedDoc.removed).to.equal(false);
      });
  });

  it('should not update the ownerId', () => {
    document.ownerId = -1000;
    return documents.update(document)
      .then(updatedDoc => {
        expect(updatedDoc.ownerId).to.equal(100);
      });
  });

  it('should add an activity log for edit', () => {
    document.abstract = 'This is an updated abstract. It should trigger an edit event.';
    return documents.update(document)
      .then(() => {
        return activityLogs.findAll();
      })
      .then(logs => {
        let log = _.find(logs, { refType: 'document', refId: document.id, description: 'edit document' });
        // jshint -W030
        expect(log).to.exist;
        // jshint +W030
      });
  });

  it('should add an activity log for publish', () => {
    document.abstract = 'This is an updated abstract. It should trigger an edit event.';
    document.published = true;
    return documents.update(document)
      .then(() => {
        return activityLogs.findAll();
      })
      .then(logs => {
        let log = _.find(logs, { refType: 'document', refId: document.id, description: 'publish document' });
        // jshint -W030
        expect(log).to.exist;
        // jshint +W030
      });
  });

  it('should add an activity log for unpublish', () => {
    document.abstract = 'This is an updated abstract. It should trigger an edit event.';
    document.published = true;
    return documents.update(document)
      .then(document => {
        document.published = false;
        return documents.update(document);
      })
      .then(() => {
        return activityLogs.findAll();
      })
      .then(logs => {
        let log = _.find(logs, { refType: 'document', refId: document.id, description: 'unpublish document' });
        // jshint -W030
        expect(log).to.exist;
        // jshint +W030
      });
  });

});
