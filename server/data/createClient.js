/* globals -Promise */
'use strict';

const getConnectionString = require('./getConnectionString');
const pg = require('pg');
const Promise = require('bluebird');

module.exports = () => {
  let connString = getConnectionString();
  return new Promise((resolve, reject) => {
    pg.connect(connString, (err, client, done) => {
      if (err) {
        return reject(err);
      }
      return resolve(client);
    });
  });
};
