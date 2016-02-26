"use strict";
const debug = require('debug')('sql');
const getConnectionString = require('./getConnectionString');
const pg = require('pg');
const Promise = require('bluebird');

module.exports = (sql, sqlParams) => {
  return new Promise((resolve, reject) => {
    const connString = getConnectionString();
    pg.connect(connString, (error, client, done) => {
      if (error) {
        return reject(error);
      }
      debug(`${sql}`);
      if (sqlParams) {
        debug(`    params: ${sqlParams}`);
      }
      client.query(sql, sqlParams || [], (error, result) => {
        if (error) {
          return reject(error);
        }
        done();
        return resolve(result);
      });
    });
  });
};
