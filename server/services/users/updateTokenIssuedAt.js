'use strict';

const executeQuery = require('../../data/executeQuery');
const User = require('../../models').User;

const sql = `UPDATE users
             SET token_issued_at = $1::timestamp
             WHERE id = $2::integer
             RETURNING *;`

module.exports = (userId, tokenIssuedAt) => {
  return executeQuery(sql, [tokenIssuedAt, userId])
    .then(function (result) {
      return new User(result.rows[0]);
    });
};
