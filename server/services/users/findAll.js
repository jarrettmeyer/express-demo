'use strict';

const executeQuery = require('../data/executeQuery');
const sql = `SELECT * FROM users;`;
const User = require('./User');

module.exports = () => {
  return executeQuery(sql)
    .then(function (result) {
      return result.rows.map((row) => {
        return new User(row);
      });
    });
};
