'use strict';

const debug = require('debug')('server');
const Document = require('../../models').Document;
const executeQuery = require('../../data/executeQuery');

const updateSql = `UPDATE documents
    SET original_filename = $2::varchar,
        path = $3::varchar,
        type = $4::varchar
    WHERE id = $1::integer AND removed = false
    RETURNING *;`;

    
function updateDocumentFile(document) {
  let params = [
    document.id,
    document.originalFilename || document.original_filename,
    document.path,
    document.type
  ];
  return executeQuery(updateSql, params)
    .then(result => {
      if (result.rows[0]) {
        document = new Document(result.rows[0]);
        debug(`Successfully saved document with id ${document.id}`);
        return document;
      }
      let message = `Unable to update document file having id ${document.id}`;
      debug(message);
      throw new Error(message);
    });

}


module.exports = updateDocumentFile;
