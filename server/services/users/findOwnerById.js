'use strict';

const executeQuery = require('../../data/executeQuery');
const Owner = require('../../models').Owner;

// An owner is a user who has at least one published document.
const sql = `SELECT DISTINCT u.id, u.display_name, u.email
             FROM users u
             INNER JOIN documents d on u.id = d.owner_id
             WHERE u.id = $1::integer
               AND d.published = TRUE
               AND d.removed = FALSE;`;

module.exports = (id) => {
  return executeQuery(sql, [id])
    .then(function (result) {
      if (result.rows.length) {
        return new Owner(result.rows[0]);
      }
      return null;
    });
};
