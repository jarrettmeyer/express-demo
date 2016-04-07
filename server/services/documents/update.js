'use strict';
const activityLogs = require('../../services/activityLogs');
const createTransaction = require('../../data/createTransaction');
// const debug = require('debug')('server:documents:update');
const Document = require('../../models').Document;
const getDocumentActions = require('./getDocumentActions');
const lastElement = require('../../utils/lastElement');
// jshint -W079
const Promise = require('bluebird');
// jshint +W079

const updateDocumentSql = `UPDATE documents
    SET title = $2::varchar,
        abstract = $3::varchar,
        published = $4::boolean
    WHERE id = $1::integer AND removed = false
    RETURNING *;`;


function commitTransaction(aggregateResult) {
  return aggregateResult.transaction.commit()
    .then(() => {
      return aggregateResult;
    });
}


function createActivityLogs(aggregateResult) {
  return Promise.map(aggregateResult.actions, action => {
    let activityLogSpec = {
      refType: 'document',
      refId: aggregateResult.document.id,
      description: action.action,
      userId: aggregateResult.user && aggregateResult.user.id
    };
    return activityLogs.create(activityLogSpec);
  })
  .then(() => {
    return aggregateResult;
  });
}


function createTransactionInternal(aggregateResult) {
  return createTransaction()
    .then(txn => {
      aggregateResult.transaction = txn;
      return aggregateResult;
    });
}


function getDocumentActionsInternal(aggregateResult) {
  aggregateResult.actions = getDocumentActions(aggregateResult.originalDocument, aggregateResult.document);
  return Promise.resolve(aggregateResult);
}


function getOriginalDocument(aggregateResult) {
  if (aggregateResult.originalDocument) {
    return Promise.resolve(aggregateResult);
  }
  let sql = 'SELECT * FROM documents WHERE id = $1 AND removed = false;';
  let params = [aggregateResult.document.id];
  return aggregateResult.transaction.query(sql, params)
    .then(selectResults => {
      let lastResult = lastElement(selectResults);
      if (!lastResult) {
        let error = new Error('Expected a query result, but none was found.');
        error.sql = sql;
        error.sqlParams = params;
        throw error;
      }
      if (lastResult.rows.length !== 1) {
        let error = new Error(`Expect to have exactly 1 result row, but instead found ${lastResult.rows.length}.`);
        error.sql = sql;
        error.sqlParams = params;
        throw error;
      }
      let documentRow = lastElement(lastResult.rows);
      aggregateResult.originalDocument = new Document(documentRow);
      return aggregateResult;
    });
}


function getUpdateDocumentParams(modifiedDocument) {
  return [
    modifiedDocument.id,
    modifiedDocument.title,
    modifiedDocument.abstract,
    modifiedDocument.published === true
  ];
}

function updateDocumentInternal(aggregateResult) {
  let updateDocumentParams = getUpdateDocumentParams(aggregateResult.document);
  return aggregateResult.transaction.query(updateDocumentSql, updateDocumentParams)
    .then(updateResults => {
      let lastResult = lastElement(updateResults);
      let lastRow = lastElement(lastResult.rows);
      if (!lastRow) {
        throw new Error(`Update document expected a SQL result row.`);
      }
      aggregateResult.document = new Document(lastRow);
      return aggregateResult;
    });
}


function updateDocument(document, optParams) {
  optParams = optParams || {};
  let aggregateResult = {
    document: document,
    originalDocument: optParams.originalDocument,
    user: optParams.user
  };
  return createTransactionInternal(aggregateResult)
    .then(getOriginalDocument)
    .then(getDocumentActionsInternal)
    .then(updateDocumentInternal)
    .then(createActivityLogs)
    .then(commitTransaction)
    .then(aggregateResult => {
      return aggregateResult.document;
    })
    .catch(error => {
      // If we have an error at any point in the operation, rollback the transaction
      // and throw the error again.
      if (aggregateResult.transaction) {
        aggregateResult.transaction.rollback();
      }
      throw error;
    });
}


module.exports = updateDocument;
