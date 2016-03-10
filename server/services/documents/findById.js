'use strict';

const Document = require('../../models/Document');
const executeQuery = require('../../data/executeQuery');
const sql = `SELECT * FROM documents WHERE id=$1::integer;`;

module.exports = (id) => {
  return executeQuery(sql, [id])
    .then(result => {
      if (result.rows[0]) {
        return new Document(result.rows[0]);
      }
      return null;
    });
};
