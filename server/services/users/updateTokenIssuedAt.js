'use strict';

const executeQuery = require('../../data/executeQuery');
const User = require('../../models').User;

const sql = `UPDATE users
    SET token_issued_at = $1::timestamp
    WHERE id = $2::integer AND removed = false
    RETURNING *;`;

module.exports = (userId, tokenIssuedAt) => {
  userId = userId.id || userId;
  return executeQuery(sql, [tokenIssuedAt, userId])
    .then(function (result) {
      if (result && result.rows && result.rows[0]) {
        return new User(result.rows[0]);
      }
      throw new Error(`Now rows to update. User id: ${userId}.`);
    });
};
