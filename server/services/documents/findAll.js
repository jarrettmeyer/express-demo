'use strict';

const executeQuery = require('../../data/executeQuery');
const Document = require('../../models').Document;

const sql = `SELECT * FROM documents
             WHERE (published = TRUE or owner_id = $1::integer)
               AND removed = FALSE;`;

module.exports = (criteria) => {
  let ownerId = (criteria && criteria.ownerId) || -1;
  return executeQuery(sql, [ownerId])
    .then(function (result) {
      return result.rows.map(row => {
        return new Document(row);
      });
    });
};
