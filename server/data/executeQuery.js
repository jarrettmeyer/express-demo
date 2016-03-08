'use strict';

const createTransaction = require('./createTransaction');
const debug = require('debug')('sql');
const Promise = require('bluebird');

module.exports = (sql, sqlParams, options) => {
  if (typeof sqlParams === 'object' && !Array.isArray(sqlParams)) {
    options = sqlParams;
    sqlParams = [];
  }
  let client = options && options.client;
  return createTransaction(client)
    .then(txn => {
      txn.begin()
      txn.query(sql, sqlParams);
      return txn.commit();
    })
    .then(results => {
      // begin, query, commit should return 3 result sets.
      if (results.length !== 3) {
        throw new Error(`Expected 3 results, but instead found ${results.length}. SQL: ${sql}. Params: ${sqlParams}.`);
      }
      return results[1];
    });
};
