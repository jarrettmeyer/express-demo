'use strict';

const executeQuery = require('../../data/executeQuery');
const hashPassword = require('../authentication/hashPassword');
const User = require('../../models').User;
const validate = require('./validate');

const sql = `INSERT INTO documents (owner_id, title, abstract, path, type, published,
                 removed)
             VALUES ($1::integer, $2::varchar, $3::varchar, $4::varchar, $5::varchar, $6::boolean, $7::boolean)
             RETURNING *;`

module.exports = (document) => {
  return validate(document)
    .then((document) => {
      let params = [
        document.ownerId,
        document.title,
        document.abstract,
        document.path,
        document.published,
        document.removed
      ];
      return executeQuery(sql, params);
    })
    .then((result) => {
      return new User(result.rows[0]);
    });
}
