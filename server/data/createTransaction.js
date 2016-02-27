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

function beginTransaction() {
  return this.query('BEGIN');
}

function commitTransaction() {
  let self = this;
  return this.query('COMMIT')
    .then(result => {
      if (self._managed) {
        self._client.end();
      }
      return result;
    });
}

function logSql(sql, params) {
  debug(sql);
  if (params) {
    debug(`>> ${params}`);
  }
}

function newTransaction(client, opts) {
  return Promise.resolve({
    _client: client,
    _managed: opts.managed,
    begin: beginTransaction,
    commit: commitTransaction,
    query: queryTransaction,
    results: [],
    rollback: rollbackTransaction
  });
}

function queryTransaction(sql, params) {
  logSql(sql, params);
  let _this = this;
  return new Promise((resolve, reject) => {
    let onQuery = (err, res) => {
      if (err) {
        return reject(err);
      }
      _this.results.push(res);
      resolve(_this.results);
    };
    _this._client.query.apply(_this._client, [sql, params || [], onQuery]);
  });
}

function rollbackTransaction() {
  let _this = this;
  return _this.query('ROLLBACK')
    .then(result => {
      if (_this.managed) {
        _this._client.end();
      }
      return result;
    });
}
