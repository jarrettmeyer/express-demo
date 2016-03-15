'use strict';

const executeQuery = require('../../data/executeQuery');
const Owner = require('../../models').Owner;

// An owner is a user who has at least one published document.
const sql = `SELECT DISTINCT u.id, u.display_name, u.email
             FROM users u
             INNER JOIN documents d on u.id = d.owner_id
             WHERE d.published = TRUE AND d.removed = FALSE;`;

module.exports = () => {
  return executeQuery(sql)
    .then(function (result) {
      return result.rows.map((row) => {
        return new Owner(row);
      });
    });
};
