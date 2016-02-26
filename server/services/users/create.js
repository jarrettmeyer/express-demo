'use strict';

const executeQuery = require('../data/executeQuery');
const hashPassword = require('../authentication/hashPassword');
const User = require('../../models').User;
const validate = require('./validate');

const sql = `INSERT INTO users (email, hashed_password, admin, removed)
             VALUES ($1::varchar, $2::varchar, $3::boolean, $4::boolean)
             RETURNING *;`

module.exports = (user) => {
  user.hashedPassword = hashPassword(user.clearPassword);
  return validate(user)
    .then((user) => {
      let params = [user.email, user.hashedPassword, user.admin, user.removed];
      return executeQuery(sql, params);
    })
    .then(function (result) {
      return new User(result.rows[0]);
    });
}
