'use strict';

const activityLogs = require('../../services/activityLogs');
const createTransaction = require('../../data').createTransaction;
const Document = require('../../models').Document;
const lastElement = require('../../utils/lastElement');
const validate = require('./validate');

const activityLogDescription = 'create document';
const sql = `INSERT INTO documents (owner_id, title, abstract, path, type, published, removed, original_filename)
             VALUES ($1::integer, $2::varchar, $3::varchar, $4::varchar, $5::varchar, $6::boolean, $7::boolean, $8::varchar)
             RETURNING *;`;


function createActivityLogData(row) {
  return {
    refType: 'document',
    refId: row.id,
    description: activityLogDescription,
    userId: row.owner_id
  };
}


function rollbackTransaction(txn) {
  if (txn && typeof txn.rollback === 'function') {
    txn.rollback();
  }
}


function createDocumentSqlParams(document) {
  return [
    document.owner_id || document.ownerId,
    document.title,
    document.abstract,
    document.path,
    document.type,
    document.published === true,
    document.removed === true,
    document.original_filename || document.originalFilename
  ];
}


module.exports = (document) => {
  let documentRow = null;
  let txn = null;
  let params = null;
  return validate(document)
    .then(() => {
      return createTransaction();
    })
    .then(_txn => {
      txn = _txn;
      txn.begin();
      params = createDocumentSqlParams(document);
      return txn.query(sql, params);
    })
    .then(results => {
      documentRow = lastElement(results).rows[0];
      let activityLogData = createActivityLogData(documentRow);
      activityLogs.create(activityLogData, { transaction: txn });
      return txn.commit();
    })
    .then(() => {
      return new Document(documentRow);
    })
    .catch(error => {
      rollbackTransaction(txn);
      throw error;
    });
};
