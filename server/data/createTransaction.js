/* global -Promise */
'use strict';

const createClient = require('./createClient');
const debug = require('debug')('sql');
const Promise = require('bluebird');

/**
 * Creates a new transaction object.
 *
 * Takes an optional `pg.Client` instance argument. If a client argument is given
 * it is assumed that the caller will call `client.end()` to release the connection
 * to the server.
 *
 * @param {pg.Client} client - A pg.Client instance.
 */
module.exports = (client) => {
  if (client) {
    return newTransaction(client, { managed: false });
  }
  return createClient()
    .then(client => {
      return newTransaction(client, { managed: true });
    });
};

function beginTransaction(txn) {
  return () => {
    return txn.query('BEGIN');
  };
}

function commitTransaction(txn) {
  return () => {
    return txn.query('COMMIT')
      .then(result => {
        if (txn._managed) {
          txn._client.end();
        }
        return result;
      });
  };
}

function logSql(sql, params) {
  debug(sql);
  if (params) {
    debug(`>> ${params}`);
  }
}

function newTransaction(client, opts) {
  let txn = {
    _client: client,
    _managed: opts.managed,
    results: []
  };
  txn.begin = beginTransaction(txn);
  txn.commit = commitTransaction(txn);
  txn.query = queryTransaction(txn);
  txn.rollback = rollbackTransaction(txn);
  return Promise.resolve(txn);
}

function queryTransaction(txn) {
  return (sql, params) => {
    logSql(sql, params);
    return new Promise((resolve, reject) => {
      let onQuery = (err, res) => {
        if (err) {
          return reject(err);
        }
        txn.results.push(res);
        resolve(txn.results);
      };
      txn._client.query.apply(txn._client, [sql, params || [], onQuery]);
    });
  };
}

function rollbackTransaction(txn) {
  return () => {
    return txn.query('ROLLBACK')
      .then(result => {
        if (txn.managed) {
          txn._client.end();
        }
        return result;
      });
  };
}
