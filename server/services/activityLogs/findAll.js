'use strict';

const ActivityLog = require('../../models').ActivityLog;
const executeQuery = require('../../data').executeQuery;

const sql = `SELECT * FROM activity_logs;`;

function findAll() {
  return executeQuery(sql)
    .then(queryResults => {
      return queryResults.rows.map(row => {
        return new ActivityLog(row);
      });
    });
}

module.exports = findAll;
