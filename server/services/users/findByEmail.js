const executeQuery = require('../data/executeQuery');
const sql = `SELECT * FROM users WHERE email = $1::varchar LIMIT 1`;
const User = require('./User');

module.exports = (email) => {
  return executeQuery(sql, [email])
    .then(function (result) {
      if (result.rows[0]) {
        return new User(result.rows[0]);
      }
      return null;
    });
};
