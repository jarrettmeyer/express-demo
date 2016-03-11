'use strict';

const Document = require('../../models').Document;
const executeQuery = require('../../data/executeQuery');
const _ = require('lodash');

const sql = `SELECT * FROM documents
             WHERE (published = TRUE or owner_id = $1::integer)
               AND removed = FALSE;`;

module.exports = (criteria) => {
  criteria = _.defaults(criteria, { ownerId: -1 });
  let params = [criteria.ownerId];
  return executeQuery(sql, params)
    .then(function (result) {
      return result.rows.map(row => {
        return new Document(row);
      });
    });
};
