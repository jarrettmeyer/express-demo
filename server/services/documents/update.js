'use strict';

const Document = require('../../models').Document;
const executeQuery = require('../../data/executeQuery');

const sql = `UPDATE documents
             SET title = $2::varchar,
                 abstract = $3::varchar,
                 original_filename = $4::varchar,
                 path = $5::varchar,
                 type = $6::varchar,
                 published = $7::boolean
             WHERE id = $1::integer AND removed = false
             RETURNING *;`;

module.exports = (document) => {
  let params = [
    document.id,
    document.title,
    document.abstract,
    document.originalFilename || document.original_filename,
    document.path,
    document.type,
    document.published === true
  ];
  return executeQuery(sql, params)
    .then(result => {
      if (result.rows[0]) {
        return new Document(result.rows[0]);
      }
      throw new Error(`Unable to update document with id ${document.id}.`);
    });

};
