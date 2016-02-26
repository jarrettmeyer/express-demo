'use strict';

const executeQuery = require('../data/executeQuery');
const User = require('./User');

const sql = `SELECT * FROM users;`;

module.exports = () => {
  return executeQuery(sql)
    .then(function (result) {
      return result.rows.map((row) => {
        return new User(row);
      });
    });
};
